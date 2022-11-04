import { IsNotEmpty } from 'class-validator';

export class ExtractedWeedModel {
  @IsNotEmpty()
  id: number;
  @IsNotEmpty()
  pointPath: number;

  @IsNotEmpty()
  weedType: number;

  @IsNotEmpty()
  sessionId: number;
}
