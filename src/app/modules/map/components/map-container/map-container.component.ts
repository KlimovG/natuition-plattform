import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
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

@Component({
  selector: 'app-map-container',
  template: `
    <div class="relative w-full h-90">
      <div id="map" class="w-full h-full"></div>
      <app-map-buttons
        class="flex flex-col absolute top-2.5 left-2.5 z-20 gap-1.5"
        [isExtracted]="isExtracted"
        [isPath]="isPath"
        [isField]="isField"
        (toggleMap)="toggleMap($event)"
      ></app-map-buttons>
    </div>
  `,
})
export class MapContainerComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() data: MapData;
  isPath: boolean = false;
  isField: boolean = true;
  isExtracted: boolean = true;
  _center: LngLat;
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';

  get center(): LngLat {
    return this._center;
  }

  set center(points) {
    this._center = points;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.map) return;

    const field: FieldType = changes['data']?.currentValue['field'];
    const path = changes['data']?.currentValue['path'];
    const extracted = changes['data']?.currentValue['extractedPoints'];

    if (field && field.geometry?.coordinates?.length > 0) {
      this.center = this.getCenterCoordinates(field);
      this.map.setCenter(this.center);
      // this.map.fitBounds(this.center);
      this.addField(field);
    }

    if (path) {
      this.addPath(path);
    }

    if (extracted) {
      this.addExtracted(extracted);
    }
  }

  ngAfterViewInit() {
    Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken').set(
      environment.mapbox.accessToken
    );
    setTimeout(() => {
      const map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 19,
        center: this.center,
      });
      this.map = map;
      this.map.fitBounds(this.center);
      this.map.addControl(new mapboxgl.NavigationControl());
    }, 0);
  }

  ngOnInit(): void {}

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
            // // Add a black outline around the polygon.
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

  getCenterCoordinates(field: FieldType): LngLat {
    const points: [number, number][] = field.geometry.coordinates
      .flat()
      .map(([lng, lat]) => [lng, lat]);
    const north: LngLat = new LngLatBounds(
      points.at(0),
      points.at(1)
    ).getCenter();
    const south: LngLat = new LngLatBounds(
      points.at(2),
      points.at(3)
    ).getCenter();

    return new LngLatBounds(north, south).getCenter();
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
