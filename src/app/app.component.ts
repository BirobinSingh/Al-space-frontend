import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'spaceManagement';
  sidebarActive = true;
  openSpace = true;
  openSpaceActive = true;
  data: any;

  handleOpenSpace() {
    this.openSpace = true;
    this.openSpaceActive = true;
  }
  handleCabinSpace() {
    this.openSpace = false;
    this.openSpaceActive = false;
  }
}
