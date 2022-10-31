import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface IButtonsData {
  label: string;
  id: string;
}

@Component({
  selector: 'app-buttons-list',
  templateUrl: './buttons-list.component.html',
  styleUrls: ['./buttons-list.component.scss'],
})
export class ButtonsListComponent implements OnInit {
  @Input() buttonsData: IButtonsData[];
  @Input() active: string;
  @Output() onClick = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}
}
