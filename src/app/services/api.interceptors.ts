import { HttpInterceptorFn } from "@angular/common/http";
import { environment } from "../../environments/env";

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
    if (req.url.startsWith('/api')) {
        const apiReq = req.clone({
            url: `${environment.apiUrl}${req.url}`
        });
        return next(apiReq)
    }
    const apiReq = req.clone({
            url: `${environment.apiUrl}${req.url}`
        });
    return next(apiReq);
}
