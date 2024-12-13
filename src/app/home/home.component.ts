import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MediaMatcher } from '@angular/cdk/layout';

import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatGridListModule,
    SidebarComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  tabletQuery!: MediaQueryList;
  private _mobileQueryListener!: () => void;

  private changeDetectorRef = inject(ChangeDetectorRef);
  private media = inject(MediaMatcher);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.tabletQuery = this.media.matchMedia('(max-width: 960px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.tabletQuery.addEventListener('change', this._mobileQueryListener);

    this.destroyRef.onDestroy(() => {
      this.tabletQuery.removeEventListener('change', this._mobileQueryListener);
    });
  }
}
