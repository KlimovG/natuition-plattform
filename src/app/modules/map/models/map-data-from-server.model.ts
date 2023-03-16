import { PathModel } from './path.model';
import { ExtractedWeedModel } from './extracted-weed.model';
import { FieldModel } from './field.model';

export class MapDataFromServer {
  extracted?: ExtractedWeedModel[];
  path?: PathModel;
  field?: FieldModel;
}
