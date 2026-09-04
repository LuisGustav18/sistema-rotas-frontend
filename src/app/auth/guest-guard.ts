import { inject, Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const guestGuard: CanActivateFn = (route, state) => {
  
  const service = inject(AuthService);
  const router = inject(Router);

  return service.isAuthenticated().pipe(
    map(isAuthenticated => {
      
      if (!isAuthenticated){
        return true;
      }

      return router.createUrlTree(['projeo']);
    })
  )
};
