import { Pipe, PipeTransform } from '@angular/core';
import { ExtractedWeedModel } from '../models/extracted-weed.model';
import { FeatureCollection } from 'geojson';

@Pipe({
  name: 'cluster',
})
export class ClusterPipe implements PipeTransform {
  transform(extracted: ExtractedWeedModel[]): FeatureCollection {
    if (extracted?.length === 0) return null;
    return {
      type: 'FeatureCollection',
      features: extracted.map((data) => ({
        type: 'Feature',
        properties: {
          id: data.id,
          label: data.weedType,
          count: data.number,
        },
        geometry: {
          type: 'Point',
          coordinates: data.pointPath,
        },
      })),
    };
  }
}
