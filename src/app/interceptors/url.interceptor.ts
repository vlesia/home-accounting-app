import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

import { environment } from '../../environments/environment';

export const urlInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
  HttpHandlerFn) => {
  const apiUrl = environment.apiUrl;

  if (!req.url.startsWith('http')) {
    const modifiedReq = req.clone({
      url: `${apiUrl}${req.url}`,
    });
    return next(modifiedReq);
  }

  return next(req);
};
