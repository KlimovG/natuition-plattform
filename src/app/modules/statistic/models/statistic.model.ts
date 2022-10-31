import { IsNotEmpty } from 'class-validator';

export class StatisticModel {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  startTime: Date | string;

  @IsNotEmpty()
  endTime: Date;

  prevSessionId?: number;

  // @Field()
  // @ManyToOne(() => RobotsModel, (robot) => robot.serialNumber, { eager: true })
  // @JoinColumn({ name: 'robot_serial_number' })
  // robotSerialNumber: RobotsModel;
  //
  // @Field(() => [ExtractedWeedsModel], { nullable: true })
  // @OneToMany(() => ExtractedWeedsModel, (extracted) => extracted.session)
  // extractedWeeds: ExtractedWeedsModel[];
  //
  // @Field()
  // @Column({ name: 'field_id' })
  // fieldId: number;
  //
  // @Field(() => VescStatisticModel, { nullable: true })
  // @OneToOne(() => VescStatisticModel, (vesc) => vesc.session)
  // statistic: VescStatisticModel;
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
