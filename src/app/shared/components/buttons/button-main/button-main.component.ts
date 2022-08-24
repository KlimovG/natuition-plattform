import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button-main',
  templateUrl: './button-main.component.html',
  styleUrls: ['./button-main.component.scss'],
})
export class ButtonMainComponent implements OnInit {
  @Output() click = new EventEmitter<any>();
  @Input() routerLink!: any[] | string | null | undefined;
  @Input() text: string = 'btn';
  @Input() css!: string;
  constructor() {}

  ngOnInit(): void {}
}
