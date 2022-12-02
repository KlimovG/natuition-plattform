import { IsNotEmpty } from 'class-validator';

export class SessionModel {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  startTime: Date | string;

  @IsNotEmpty()
  endTime: Date | string;

  prevSessionId?: number;
}
// id
// startTime
// endTime
// prevSessionId
// fieldId
// statistic {
//   id
//   sessionId
//   voltage
//   timestamp
// }
// extractedWeeds {
//   id
//   pointPath
//   weedType
//   sessionId
// }
