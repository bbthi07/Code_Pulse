import { Token } from '@angular/compiler';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import {jwtDecode}  from 'jwt-decode'

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService)
  const authService = inject(AuthService)
  const router = inject(Router)
  const user = authService.getUser();

  //Check the jWT Token
  let token = cookieService.get('Authorization')
  if (token && user){
    token = token.replace("Bearer",'');
    const decodedToken : any = jwtDecode(token);

    const expirationDate = decodedToken.exp * 1000;
    const currenttime = new Date().getTime();
    if (expirationDate < currenttime)
    {
      authService.logout();
     // return router.navigateByUrl('/login');
      return router.createUrlTree(['/login'], {queryParams : {returnUrl: state.url}})
    }
    else
    {
      // Token is valid. we need get roles from the user
      if (user.roles.includes('Writer'))
      {
        return true;
      }
      else {
        alert('UnAuhorized');
        return false;
      }
    }
  }else
  {
    authService.logout();
    //return router.navigateByUrl('/login');
    return router.createUrlTree(['/login'], {queryParams : {returnUrl: state.url}})
  }
};
