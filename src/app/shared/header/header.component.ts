import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navItems: MenuItem[];
  activeRoute = -1;

  constructor(private router: Router) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.url.indexOf('items') !== -1) {
          this.activeRoute = 0;
        } else if (event.url.indexOf('stores') !== -1) {
          this.activeRoute = 1;
        }
        this.setUpMenu();
      });
  }

  ngOnInit(): void {
    this.setUpMenu();
  }

  setUpMenu() {
    this.navItems = [
      {
        label: 'Items',
        icon: 'ei ei-cart',
        routerLink: './items',
        routerLinkActiveOptions: {},
        styleClass: (this.activeRoute === 0) ? 'ui-state-active' : ''
      },
      {
        label: 'Stores',
        icon: 'ei ei-beaker',
        routerLink: '/stores',
        routerLinkActiveOptions: {},
        styleClass: (this.activeRoute === 1) ? 'ui-state-active' : ''
      }
    ];
  }

}
