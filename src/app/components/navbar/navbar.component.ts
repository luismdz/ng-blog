import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() sideNav: any;
  isNavOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  onNavOpen(): void {
    this.sideNav.toggle();
    // this.isNavOpen = !this.isNavOpen;
  }
}
