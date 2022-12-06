import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { LngLat, LngLatBounds } from 'mapbox-gl';
import { environment } from '../../../../../environments/environment';
import { FieldModel } from '../../models/field.model';
import { PathModel } from '../../models/path.model';
import { ExtractedWeedModel } from '../../models/extracted-weed.model';

@Component({
  selector: 'app-map-container',
  template: ` <div id="map" class="map match-parent w-full h-full rounded-2xl">
    <app-map-buttons
      class="flex flex-col absolute top-2.5 left-2.5 z-20 gap-1.5"
      [isExtracted]="isExtracted"
      [isPath]="isPath"
      [isField]="isField"
      (toggleMap)="toggleMap($event)"
    ></app-map-buttons>
  </div>`,
  styleUrls: ['./map-container.component.scss'],
})
export class MapContainerComponent implements OnInit, OnChanges {
  @Input() field: FieldModel;
  @Input() path: PathModel[];
  @Input() extractedPoints: ExtractedWeedModel[];

  isPath: boolean = true;
  isField: boolean = true;
  isExtracted: boolean = false;
  _center: LngLat;
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';

  constructor() {}

  get center(): LngLat {
    return this._center;
  }

  set center(points) {
    this._center = points;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['field']) {
      const field = changes['field']?.currentValue;
      const path = changes['path']?.currentValue;
      const extracted = changes['extractedPoints']?.currentValue;

      if (field && field.corners.length >= 4) {
        this.center = this.getCenterCoordinates(field.corners);
        this.map.setCenter(this.center);
        this.addField(field.corners);
      }

      if (path && path?.length) {
        this.addRoute(path);
      }

      if (extracted && extracted?.length) {
        this.addExtracted(extracted);
      }
    }
  }

  ngOnInit(): void {
    Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken').set(
      environment.mapbox.accessToken
    );
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 17,
      center: this.center,
    });

    this.map.addControl(new mapboxgl.NavigationControl());
  }

  toggleMap(type: string) {
    switch (type) {
      case 'field':
        this.isField = !this.isField;
        break;
      case 'path':
        this.isPath = !this.isPath;
        break;
      case 'extracted':
        this.isExtracted = !this.isExtracted;
        break;
    }
  }

  private addField(gpsField: number[][]) {
    if (this.map.getSource('field')) {
      this.map.removeLayer('outline');
      this.map.removeLayer('field');
      this.map.removeSource('field');
    }

    //For the polygon, the first and last value of coordinates must be the same
    this.map.addSource('field', {
      type: 'geojson',
      data: {
        properties: {
          title: 'Field',
        },
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          // These coordinates outline Maine.
          coordinates: [gpsField],
        },
      },
    });
    // Add a new layer to visualize the polygon.
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

  addRoute(gpsPath: [number, number][]) {
    if (this.map.getSource('route')) {
      this.map.removeLayer('route');
      this.map.removeSource('route');
    }
    this.map.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: gpsPath,
        },
      },
    });
    this.map.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#F3A712',
        'line-width': 7,
        'line-opacity': 1,
      },
    });
  }

  getCenterCoordinates(points: [number, number][]): LngLat {
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

  private addExtracted(extracted: any): void {}
}
