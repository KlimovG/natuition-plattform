import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { LngLat, LngLatBounds, PositionOptions } from 'mapbox-gl';
import { environment } from '../../../../../environments/environment';
import { FieldModel } from '../../models/field.model';
import { Position } from 'postcss';

@Component({
  selector: 'app-map-container',
  template: '<div id="map" class="map match-parent w-full h-full"></div>',
  styleUrls: ['./map-container.component.scss'],
})
export class MapContainerComponent implements OnInit, OnChanges {
  @Input() field: FieldModel;
  _center: LngLat;
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 37.75;
  lng = -122.41;
  constructor() {}

  get center(): LngLat {
    return this._center;
  }

  set center(points) {
    this._center = points;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['field']) {
      const value = changes['field'].currentValue;

      if (value && value.corners.length >= 4) {
        this.center = this.getCenterCoordinates(value.corners);
        this.map.setCenter(this.center);
        this.addField(value.corners);
      }
    }
    // if (!!field?.corners && field.corners.length === 4) {
    // }
  }
  private addField(gpsField: LngLat[]) {
    let coordinates: number[][] = [];
    if (this.map.getSource('field')) {
      this.map.removeLayer('outline');
      this.map.removeLayer('field');
      this.map.removeSource('field');
    }

    //For the polygon, the first and last value of coordinates must be the same
    gpsField.map(({ lng, lat }) => coordinates.push([lng, lat]));
    coordinates.push(coordinates.at(0));
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
          coordinates: [coordinates],
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
  ngOnInit(): void {
    Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken').set(
      environment.mapbox.accessToken
    );
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 16,
      center: this.center,
    });

    this.map.addControl(new mapboxgl.NavigationControl());
  }

  getCenterCoordinates(points: Array<LngLat>): LngLat {
    // @ts-ignore
    console.log(points);
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
}
