import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FilteringCriteriaComponent } from './components/filtering-criteria/filtering-criteria.component';

import { ItemsService } from './services/items-service.service';

import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { YoutubeService } from '../youtube/services/youtube.service';
import { AuthService } from '../auth/services/auth.service';
import { YoutubeInterceptor } from '../youtube/services/youtube.interceptor';

@NgModule({
  declarations: [HeaderComponent, FilteringCriteriaComponent],
  imports: [CommonModule, SharedModule, AppRoutingModule],
  exports: [HeaderComponent, FilteringCriteriaComponent],
  providers: [
    ItemsService,
    AuthService,
    YoutubeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: YoutubeInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
