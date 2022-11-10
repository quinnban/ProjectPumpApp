import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if account is logged in and request is to the api url
        // const account = this.accountService.accountValue;
        //const idToken = localStorage.getItem("id_token");
        // const isLoggedIn = account?.token;
        // const isApiUrl = request.url.startsWith(environment.apiUrl);
        // if (isLoggedIn && isApiUrl) {
        //     request = request.clone({
        //         setHeaders: { Authorization: `Bearer ${account.token}` }
        //     });
        // }

        return next.handle(request);
    }
}
