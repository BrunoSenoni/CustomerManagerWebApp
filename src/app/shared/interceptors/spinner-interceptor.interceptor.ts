import { HttpInterceptorFn } from '@angular/common/http';
import { LoadingService } from '../services/loading.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const spinnerInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  loadingService.setLoading(true);
  return next(req).pipe(
    finalize(() => {
      loadingService.setLoading(false);
    })
  );
};
