import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class HttpInterseptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/auth_google')) {
      return next.handle(req);
    } else {
      const token = 'authenticationToken='+JSON.parse(localStorage.getItem('adminData')).token;
      let currentUrl = req.url.includes('?') ? req.url+'&'+token : req.url+'?'+token;
      console.log(currentUrl);
      const httpRequest = new HttpRequest(<any>req.method,currentUrl);
      req = Object.assign(req, httpRequest);
      return next.handle(req);
    }
  }
}
