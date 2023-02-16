import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainFooterComponent {
  constructor() {}
}
