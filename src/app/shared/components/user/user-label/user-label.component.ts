import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-label',
  templateUrl: './user-label.component.html',
})
export class UserLabelComponent implements OnInit {
  @Input() userName!: string;
  constructor() {}

  ngOnInit(): void {}
}
