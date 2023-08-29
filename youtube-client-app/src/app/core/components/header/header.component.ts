import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { searchVideos } from 'src/app/redux/actions/card.actions';
import { AppState } from 'src/app/redux/state.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  viewFilters = false;

  searchString = '';

  userName: string;

  private subscriptionName: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    const username = this.authService.userName$;
    this.subscriptionName = username.subscribe((name) => {
      this.userName = name;
    });
    this.authService.getUser();
  }

  ngOnDestroy() {
    this.subscriptionName.unsubscribe();
  }

  showSearchResults(query: string) {
    this.router.navigate(['/main']);
    this.store.dispatch(searchVideos({ query }));
  }

  changeFiltersVisibility() {
    this.viewFilters = !this.viewFilters;
  }
}
