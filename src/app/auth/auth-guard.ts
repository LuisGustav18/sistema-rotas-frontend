import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router);
  const service = inject(AuthService);

  return service.isAuthenticated().pipe(
    map(isAuthenticated => {
      if (isAuthenticated){
        return true;
      }

      return router.createUrlTree(['login'])
    })
  )
};
