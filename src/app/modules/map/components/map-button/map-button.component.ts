import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-map-button',
  template: `
    <button
      class="w-10 h-10 p-2 rounded-full  border-2 border-green transition-colors"
      [ngClass]="{ 'bg-green': active, 'bg-white': !active }"
      (click)="toggle.emit(name)"
    >
      <ng-container [ngSwitch]="name">
        <svg
          *ngSwitchCase="'path'"
          class="w-full h-full"
          viewBox="0 0 24 24"
          [ngClass]="{ 'fill-white': active, 'fill-black': !active }"
        >
          <path
            d="M21 15C21 16.1 20.6083 17.0417 19.825 17.825C19.0417 18.6083 18.1 19 17 19H8.825C8.60833 19.5833 8.24567 20.0627 7.737 20.438C7.229 20.8127 6.65 21 6 21C5.16667 21 4.45833 20.7083 3.875 20.125C3.29167 19.5417 3 18.8333 3 18C3 17.1667 3.29167 16.4583 3.875 15.875C4.45833 15.2917 5.16667 15 6 15C6.65 15 7.229 15.1873 7.737 15.562C8.24567 15.9373 8.60833 16.4167 8.825 17H17C17.55 17 18.021 16.804 18.413 16.412C18.8043 16.0207 19 15.55 19 15C19 14.45 18.8043 13.979 18.413 13.587C18.021 13.1957 17.55 13 17 13H7C5.9 13 4.95833 12.6083 4.175 11.825C3.39167 11.0417 3 10.1 3 9C3 7.9 3.39167 6.95833 4.175 6.175C4.95833 5.39167 5.9 5 7 5H15.175C15.3917 4.41667 15.754 3.93733 16.262 3.562C16.7707 3.18733 17.35 3 18 3C18.8333 3 19.5417 3.29167 20.125 3.875C20.7083 4.45833 21 5.16667 21 6C21 6.83333 20.7083 7.54167 20.125 8.125C19.5417 8.70833 18.8333 9 18 9C17.35 9 16.7667 8.81267 16.25 8.438C15.7333 8.06267 15.375 7.58333 15.175 7H7C6.45 7 5.97933 7.19567 5.588 7.587C5.196 7.979 5 8.45 5 9C5 9.55 5.196 10.0207 5.588 10.412C5.97933 10.804 6.45 11 7 11H17C18.1 11 19.0417 11.3917 19.825 12.175C20.6083 12.9583 21 13.9 21 15ZM7 18C7 17.7167 6.90433 17.479 6.713 17.287C6.521 17.0957 6.28333 17 6 17C5.71667 17 5.479 17.0957 5.287 17.287C5.09567 17.479 5 17.7167 5 18C5 18.2833 5.09567 18.521 5.287 18.713C5.479 18.9043 5.71667 19 6 19C6.28333 19 6.521 18.9043 6.713 18.713C6.90433 18.521 7 18.2833 7 18ZM19 6C19 5.71667 18.904 5.47933 18.712 5.288C18.5207 5.096 18.2833 5 18 5C17.7167 5 17.4793 5.096 17.288 5.288C17.096 5.47933 17 5.71667 17 6C17 6.28333 17.096 6.52067 17.288 6.712C17.4793 6.904 17.7167 7 18 7C18.2833 7 18.5207 6.904 18.712 6.712C18.904 6.52067 19 6.28333 19 6Z"
          />
        </svg>
        <svg
          *ngSwitchCase="'extracted'"
          class="w-full h-full"
          viewBox="0 0 24 24"
          [ngClass]="{ 'fill-white': active, 'fill-black': !active }"
        >
          <path
            d="M12 8C9.79 8 8 9.79 8 12C8 14.21 9.79 16 12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8ZM20.94 11C20.7135 8.97212 19.8042 7.08154 18.3613 5.63869C16.9185 4.19585 15.0279 3.28651 13 3.06V2C13 1.45 12.55 1 12 1C11.45 1 11 1.45 11 2V3.06C8.97212 3.28651 7.08154 4.19585 5.63869 5.63869C4.19585 7.08154 3.28651 8.97212 3.06 11H2C1.45 11 1 11.45 1 12C1 12.55 1.45 13 2 13H3.06C3.28651 15.0279 4.19585 16.9185 5.63869 18.3613C7.08154 19.8042 8.97212 20.7135 11 20.94V22C11 22.55 11.45 23 12 23C12.55 23 13 22.55 13 22V20.94C15.0279 20.7135 16.9185 19.8042 18.3613 18.3613C19.8042 16.9185 20.7135 15.0279 20.94 13H22C22.55 13 23 12.55 23 12C23 11.45 22.55 11 22 11H20.94ZM12 19C8.13 19 5 15.87 5 12C5 8.13 8.13 5 12 5C15.87 5 19 8.13 19 12C19 15.87 15.87 19 12 19Z"
          />
        </svg>
        <svg
          *ngSwitchCase="'field'"
          class="w-full h-full"
          viewBox="0 0 24 24"
          fill="none"
          [ngClass]="{ 'fill-white': active, 'fill-black': !active }"
        >
          <g clip-path="url(#clip0_1_216)">
            <path
              d="M3.012 3.60001C1.35888 3.60001 0 4.95865 0 6.61201C0 8.05609 1.03608 9.27505 2.4 9.56065V14.4634C1.03608 14.749 0 15.9682 0 17.4122C0 19.0656 1.35864 20.424 3.012 20.424C4.46328 20.424 5.6736 19.3742 5.94984 18H18.059C18.3355 19.3757 19.5598 20.424 21.0122 20.424C22.6082 20.424 23.9174 19.1549 24.007 17.5795C24.0181 17.5245 24.0238 17.4684 24.0238 17.4122C24.0238 17.3561 24.0181 17.3 24.007 17.245C23.9287 15.8681 22.9188 14.7254 21.6 14.459V9.56497C22.9188 9.29857 23.9287 8.15617 24.0072 6.77953C24.0184 6.72447 24.024 6.66843 24.024 6.61225C24.024 6.55607 24.0184 6.50002 24.0072 6.44497C23.9172 4.86961 22.6082 3.60001 21.012 3.60001C19.5682 3.60001 18.349 4.63609 18.0634 6.00001H5.9448C5.6592 4.63777 4.45464 3.60001 3.012 3.60001ZM3.012 5.28001C3.75768 5.28001 4.344 5.86657 4.344 6.61201C4.344 7.35769 3.75768 7.94401 3.012 7.94401C2.2668 7.94401 1.68 7.35769 1.68 6.61201C1.68 5.86681 2.26656 5.28001 3.012 5.28001ZM21.012 5.28001C21.7577 5.28001 22.344 5.86657 22.344 6.61201C22.344 7.35769 21.7577 7.94401 21.012 7.94401C20.2666 7.94401 19.68 7.35769 19.68 6.61201C19.68 5.86657 20.2666 5.28001 21.012 5.28001ZM5.81232 7.68001H18.2011C18.3524 8.07206 18.5832 8.42854 18.879 8.72698C19.1748 9.02541 19.5293 9.25934 19.92 9.41401V14.61C19.5333 14.7631 19.182 14.9938 18.8879 15.2879C18.5938 15.582 18.3631 15.9333 18.21 16.32H5.802C5.64915 15.9302 5.41724 15.5762 5.12088 15.2804C4.82451 14.9845 4.47012 14.7533 4.08 14.6011V9.42289C4.47432 9.26928 4.83213 9.03486 5.13043 8.7347C5.42874 8.43454 5.66093 8.07527 5.81208 7.68001H5.81232ZM3.012 16.08C3.75744 16.08 4.34376 16.6666 4.34376 17.412C4.34376 18.1577 3.75744 18.744 3.01176 18.744C2.2668 18.744 1.68 18.1577 1.68 17.412C1.68 16.6668 2.26656 16.08 3.012 16.08ZM21.012 16.08C21.7574 16.08 22.3438 16.6666 22.3438 17.412C22.3438 18.1577 21.7574 18.744 21.0118 18.744C20.2663 18.744 19.6798 18.1577 19.6798 17.412C19.6798 16.6666 20.2663 16.08 21.0118 16.08H21.012Z"
            />
          </g>
          <defs>
            <clipPath id="clip0_1_216">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </ng-container>
    </button>
  `,
})
export class MapButtonComponent {
  @Input() name: string;
  @Input() active = true;
  @Output() toggle = new EventEmitter<string>();
}
