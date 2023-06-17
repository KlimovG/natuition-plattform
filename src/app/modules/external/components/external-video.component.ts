import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-video-player',
  template: `
    <div class="w-full h-full flex items-center">
      <div
        class="bg-white rounded-2xl mx-auto my-auto py-5 px-5 w-full items-center max-w-dashboard-web h-dashboard flex-grow flex justify-center"
      >
        <div>
          <div class="max-w-full w-20 mx-auto">
            <app-logo></app-logo>
          </div>
          <div
            class="flex justify-center items-center mt-6 rounded-xl overflow-hidden relative"
          >
            <img
              *ngIf="isImage$ | async"
              ngSrc="http://localhost:3000/api/polls/video"
              width="640"
              height="480"
              alt="Live Video from robot"
              (error)="onImageError($event)"
              (load)="onImageLoad($event)"
            />
            <p *ngIf="(isImage$ | async) === false" class="text-lg ">
              {{ 'video.noImage' | translate }}
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ExternalVideoComponent {
  isImage$ = new BehaviorSubject<boolean>(false);
  onImageError(event: any) {
    this.isImage$.next(false);
  }
  onImageLoad(event: any) {
    console.log(event);
    this.isImage$.next(true);
  }

  protected readonly event = event;
}
