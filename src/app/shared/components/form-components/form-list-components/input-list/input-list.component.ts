import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-list',
  templateUrl: './input-list.component.html',
  styleUrls: ['./input-list.component.scss'],
})
export class InputListComponent implements OnInit {
  @Input() data: { placeholder: string; controlName: string }[] = [];

  constructor() {}

  ngOnInit(): void {}
}
