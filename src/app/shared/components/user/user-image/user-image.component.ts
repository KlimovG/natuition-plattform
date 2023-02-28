import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-image',
  templateUrl: './user-image.component.html',
})
export class UserImageComponent implements OnInit {
  @Input() imageLink!: string;
  constructor() {}

  ngOnInit(): void {}
}
