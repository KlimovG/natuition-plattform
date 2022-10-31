import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-buttons-list',
  templateUrl: './buttons-list.component.html',
  styleUrls: ['./buttons-list.component.scss'],
})
export class ButtonsListComponent implements OnInit {
  @Input() buttonsData: any;
  @Input() active: string;
  @Output() onClick = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}
}
