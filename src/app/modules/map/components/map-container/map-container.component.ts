import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { GeoJSONSource, LngLat, LngLatBounds } from 'mapbox-gl';
import { environment } from '../../../../../environments/environment';
import {
  ExtractedType,
  FieldType,
  MapData,
  PathType,
} from '../../models/map.model';
import { selectActiveSessionData } from '../../../sessions/state/sessions.reducer';
import { selectActiveRobotSerial } from '../../../robots/state/robots.reducer';
import {
  CoordinatesWithExtractedWeedFromRobot,
  CoordinateWithExtractedWeed,
} from '../../models/coordinate_with_extracted_weed.model';
import { filter, map, Observable } from 'rxjs';
import { selectMapData } from '../../state/map.reducer';
import { MapDataFromServer } from '../../models/map-data-from-server.model';
import { Store } from '@ngrx/store';
import { MapDataPipe } from '../../pipes/mapData.pipe';
import { WebSocketSubject } from 'rxjs/internal/observable/dom/WebSocketSubject';
import { State } from '../../../../state';
import { webSocket } from 'rxjs/webSocket';
import { ExtractedWeedModel } from '../../models/extracted-weed.model';

@Component({
  selector: 'app-map-container',
  template: `
    <div class="relative w-full h-full">
      <div
        id="map"
        class="w-full h-full flex transition-opacity"
        [ngClass]="{ 'opacity-0': isLoading }"
      ></div>
      <app-map-buttons
        class="flex flex-col absolute top-2.5 left-2.5 z-20 gap-1.5"
        [isExtracted]="isExtracted"
        [isPath]="isPath"
        [isField]="isField"
        (toggleMap)="toggleMap($event)"
      ></app-map-buttons>
      <app-spinner name="map" size="medium"></app-spinner>
    </div>
  `,
})
export class MapContainerComponent implements OnChanges, OnDestroy {
  @Input() data: MapData;
  @Input() isLoading: boolean;
  isPath: boolean = true;
  isField: boolean = true;
  isExtracted: boolean = true;
  _center: LngLat;
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v12';
  layerOrder = ['outline', 'field', 'path', 'extracted']; // the order of your layers
  activeSessionId$: Observable<number>;
  activeSessionId: number;
  activeRobot$: Observable<string>;
  robotWebSocket: WebSocketSubject<any>;
  new_map_value: MapDataFromServer;

  constructor(
    private store: Store<State>,
    private map_data_pipe: MapDataPipe
  ) { }

  get center(): LngLat {
    return this._center;
  }

  set center(points) {
    this._center = points;
  }

  ngOnInit(): void {
    this.activeSessionId$ = this.store.select(selectActiveSessionData()).pipe(
      filter((s) => !!s),
      map((session) => session.id)
    );
    this.activeSessionId$.subscribe((value) => {
      this.activeSessionId = value;
    });

    this.activeRobot$ = this.store.select(selectActiveRobotSerial());
    this.activeRobot$.subscribe((value) => {
      this.robotWebSocket = webSocket(
        'wss://fleet.natuition.com/api/v1/data_gathering/ws/client/' + value
      );
      this.robotWebSocket.subscribe({
        next: (data) => {
          console.log('data from socket', data);
          return this.receiveDataOnRobotWebSocket(data);
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete'),
      });
    });

    this.store
      .select(selectMapData())
      .subscribe((value) => (this.new_map_value = value));
  }

  receiveDataOnRobotWebSocket(data: CoordinatesWithExtractedWeedFromRobot) {
    const coordinates_with_extracted_weeds: CoordinateWithExtractedWeed[] =
      data['coordinate_with_extracted_weed'];
    if (coordinates_with_extracted_weeds != undefined) {
      if (this.activeSessionId == data.session_id) {
        let id = this.new_map_value.extracted?.at(-1)?.id + 1;

        for (const coordinate_with_extracted_weed of coordinates_with_extracted_weeds) {
          for (let extracted_weed in coordinate_with_extracted_weed.extracted_weeds) {
            var new_extracted_weed: ExtractedWeedModel = {
              id: id,
              pointPath: [
                coordinate_with_extracted_weed.current_coordinate[1],
                coordinate_with_extracted_weed.current_coordinate[0],
              ],
              weedType: extracted_weed,
              number:
                coordinate_with_extracted_weed.extracted_weeds[extracted_weed],
            };
            this.new_map_value.extracted.push(new_extracted_weed);
            id += 1;
          }

          this.new_map_value.path.path.push([
            coordinate_with_extracted_weed.current_coordinate[1],
            coordinate_with_extracted_weed.current_coordinate[0],
          ]);
        }
        this.addPath(this.map_data_pipe.transform(this.new_map_value).path);
        this.addExtracted(
          this.map_data_pipe.transform(this.new_map_value).extractedPoints
        );
        this.reorderLayers();
        this.map.triggerRepaint();
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const field: FieldType = changes['data']?.currentValue['field'];
    const path = changes['data']?.currentValue['path'];
    const extracted = changes['data']?.currentValue['extractedPoints'];
    if (!this.map) {
      this.initMap();
      this.map.on('load', () => this.initMapData(field, path, extracted));
      return;
    }
    this.initMapData(field, path, extracted);
  }

  initMapData(field: FieldType, path: PathType, extracted: ExtractedType) {
    if (field && field.geometry?.coordinates?.length > 0) {
      const [lng, lat]: [number, number][] = field.geometry.coordinates
        .flat()
        .map(([lng, lat]) => [lng, lat]);
      const bounds = new LngLatBounds(lng, lat);
      this.map.fitBounds(bounds, { padding: 40, animate: false });
      this.addField(field);
    }

    if (path) {
      this.addPath(path);
    }

    if (extracted) {
      this.addExtracted(extracted);
    }
  }

  initMap() {
    Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken').set(
      environment.mapbox.accessToken
    );
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 19,
      center: this.center,
    });
    this.map.addControl(new mapboxgl.FullscreenControl());
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.on('load', () => {
      this.reorderLayers();
      this.map.resize();
    });
    this.map.addControl(new mapboxgl.ScaleControl());
  }

  ngOnDestroy() {
    this.map.remove();
  }

  toggleMap(type: string) {
    switch (type) {
      case 'field':
        this.isField = !this.isField;
        if (!!this.map.getSource('field')) {
          if (this.isField) {
            // Add a new layer to visualize the polygon.
            this.map.addLayer({
              id: 'field',
              type: 'fill',
              source: 'field', // reference the data source
              paint: {
                'fill-color': '#0080ff', // blue color fill
                'fill-opacity': 0.3,
              },
            });
            // Add a black outline around the polygon.
            this.map.addLayer({
              id: 'outline',
              type: 'line',
              source: 'field',
              paint: {
                'line-color': '#F37E12',
                'line-width': 1,
              },
            });
          } else {
            this.map.removeLayer('outline');
            this.map.removeLayer('field');
          }
        }
        break;
      case 'path':
        this.isPath = !this.isPath;
        if (!!this.map.getSource('path')) {
          if (this.isPath) {
            this.map.addLayer({
              id: 'path',
              type: 'line',
              source: 'path',
              layout: {
                'line-join': 'round',
                'line-cap': 'round',
              },
              paint: {
                'line-color': '#cc3737',
                'line-width': 7,
                'line-opacity': 1,
              },
            });
          } else {
            this.map.removeLayer('path');
          }
        }
        break;
      case 'extracted':
        this.isExtracted = !this.isExtracted;
        if (!!this.map.getSource('extracted')) {
          if (this.isExtracted) {
            this.map.addLayer({
              id: 'extracted',
              type: 'circle',
              source: 'extracted',
              paint: {
                'circle-color': '#F3A712',
                'circle-radius': 5,
              },
            });
          } else {
            this.map.removeLayer('extracted');
          }
        }
        break;
    }
    this.reorderLayers();
  }

  private reorderLayers(): void {
    const visibleLayers = this.layerOrder
      .map((layerId) => {
        const isVisible = this.map.getLayer(layerId);
        return isVisible ? layerId : null;
      })
      .filter((l) => !!l);
    visibleLayers.forEach((layer, i, arr) => {
      const nextLayer = arr.at(i + 1);
      if (!!nextLayer) {
        this.map.moveLayer(layer, nextLayer);
      }
    });
  }

  private addField(field: FieldType) {
    if (this.map?.getSource('field')) {
      (this.map.getSource('field') as GeoJSONSource).setData(field);
      return;
    }
    //For the polygon, the first and last value of coordinates must be the same
    this.map.addSource('field', {
      type: 'geojson',
      data: field,
    });
    // Add a new layer to visualize the polygon.
    if (this.isField) {
      this.map.addLayer({
        id: 'field',
        type: 'fill',
        source: 'field', // reference the data source
        layout: {},
        paint: {
          'fill-color': '#0080ff', // blue color fill
          'fill-opacity': 0.3,
        },
      });
      // // Add a black outline around the polygon.
      this.map.addLayer({
        id: 'outline',
        type: 'line',
        source: 'field',
        layout: {},
        paint: {
          'line-color': '#F37E12',
          'line-width': 1,
        },
      });
    }
  }

  addPath(path: PathType) {
    if (this.map?.getSource('path')) {
      (this.map.getSource('path') as GeoJSONSource).setData(path);
      return;
    }
    this.map.addSource('path', {
      type: 'geojson',
      data: path,
    });
    if (this.isPath) {
      this.map.addLayer({
        id: 'path',
        type: 'line',
        source: 'path',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#cc3737',
          'line-width': 7,
          'line-opacity': 1,
        },
      });
    }
  }

  private addExtracted(extracted: ExtractedType): void {
    if (this.map?.getSource('extracted')) {
      (this.map.getSource('extracted') as GeoJSONSource).setData(extracted);
      return;
    }
    this.map.addSource('extracted', {
      type: 'geojson',
      data: extracted,
    });
    if (this.isExtracted) {
      this.map.addLayer({
        id: 'extracted',
        type: 'circle',
        source: 'extracted',
        paint: {
          'circle-color': '#F3A712',
          'circle-radius': 5,
        },
      });
    }
  }
}
