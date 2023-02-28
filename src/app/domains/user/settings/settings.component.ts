import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  imports: [NgClass],
  styleUrls: [],
})
export default class SettingsComponent {
  routerUrl = inject(Router).url;
}
