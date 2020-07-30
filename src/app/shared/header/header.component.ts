import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navItems: MenuItem[];

  constructor() {
  }

  ngOnInit(): void {
    this.navItems = [
      {
        label: 'Items',
        icon: 'ei ei-cart',
        routerLink: './items',
        routerLinkActiveOptions: {},
        // styleClass: (this.activeRoute === this.appRoute.ORDERINGSERVICE) ? 'ui-state-active' : ''
      },
      {
        label: 'Stores',
        icon: 'ei ei-beaker',
        routerLink: '/stores',
        routerLinkActiveOptions: {},
        // styleClass: (this.activeRoute === this.appRoute.SAMPLESERVICE) ? 'ui-state-active' : ''
      }
    ];
  }

}
