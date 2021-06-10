import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'app/_services/authentication.service';

@Component({
  selector: 'ngx-user-listCard',
  template: `
    <nb-card class="popover-card">
      <nb-card-body>
      <nb-list>
      <nb-list-item (click)="btnAction(userm.title)" *ngFor="let userm of userMenu" style="border-bottom: none !important;border-top: none !important; cursor:pointer">
        {{ userm.title }}
      </nb-list-item>
    </nb-list>
      </nb-card-body>
    </nb-card>
  `,
  styles: [`
    nb-card {
      margin: 0;
      min-width: 10px
    }
  `],
})
export class NgxUserlistCardComponent {
  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];
  constructor(private AuthenService: AuthenticationService,) { }
  btnAction(btnact) {
    if (btnact == 'Log out') {
      this.AuthenService.clearusers();
    }
  }
}

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() menuToggle: boolean = true;
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = true;
  user: any;
  cardComponent = NgxUserlistCardComponent;
  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [ { title: 'Profile' }, { title: 'Log out' } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
  
    ) {
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }
 

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
