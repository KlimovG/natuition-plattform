import { Pipe, PipeTransform } from '@angular/core';
import { MapData, MapDataFromServer } from '../models/map.model';

@Pipe({
  name: 'mapData',
})
export class MapDataPipe implements PipeTransform {
  transform(data: MapDataFromServer): MapData {
    let result: MapData = {
      field: null,
      path: null,
      extractedPoints: null,
    };
    if (data?.field) {
      result.field = {
        properties: {
          title: 'Field',
        },
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [data.field.corners],
        },
      };
    }

    if (data?.path?.length > 0) {
      Object.defineProperty(result, 'path', {
        value: {
          type: 'Feature',
          properties: {
            title: 'Route',
          },
          geometry: {
            type: 'LineString',
            coordinates: data.path,
          },
        },
      });
    }

    if (data?.extractedPoints?.length > 0) {
      const coordinates = data.extractedPoints.map((point) => point.pointPath);

      Object.defineProperty(result, 'extractedPoints', {
        value: {
          type: 'MultiPoint',
          coordinates,
        },
      });
    }

    return result;
  }
}
