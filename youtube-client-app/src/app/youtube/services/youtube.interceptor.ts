import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export const BASE_URL = 'https://www.googleapis.com/youtube/v3';

@Injectable()
export class YoutubeInterceptor implements HttpInterceptor {
  private readonly API_KEY = environment.API_KEY;

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(
      request.clone({
        url: `${BASE_URL}/${request.url}`,
        params: request.params.set('key', this.API_KEY),
      })
    );
  }
}
