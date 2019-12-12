import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('interceptor');
        const c2c_token = localStorage.getItem("c2c_token");
        console.log(c2c_token);
        if (c2c_token) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + c2c_token)
            });

            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }
}