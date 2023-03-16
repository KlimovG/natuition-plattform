import { Pipe, PipeTransform } from '@angular/core';
import { MapData } from '../models/map.model';
import { MapDataFromServer } from '../models/map-data-from-server.model';

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

    if (data?.path?.pathGPS?.length > 0) {
      Object.defineProperty(result, 'path', {
        value: {
          type: 'Feature',
          properties: {
            title: 'Route',
          },
          geometry: {
            type: 'LineString',
            coordinates: data.path.pathGPS,
          },
        },
      });
    }

    if (data?.extracted?.length > 0) {
      const coordinates = data.extracted.map((point) => point.pointPath);

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
