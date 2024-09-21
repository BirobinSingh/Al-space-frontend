import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { PaymentIntent } from '@stripe/stripe-js';

export const PLUTO_ID = new InjectionToken<string>('[PLUTO] ClientID');

export const STRIPE_PUBLIC_KEY =
  'pk_test_51MJVB7SIgdXqjWkRalg9W14ljeHlF0Pm0LfS50oUr7F62qsp0VmhIphg3oziap79ayqJE5kpBjBQjIKAnA2CYQSn00CD3B7pXw';


@Injectable({ providedIn: 'root' })
export class PlutoService {
  private static readonly BASE_URL = '';

  constructor(
    @Inject(PLUTO_ID) private readonly clientId: string,
    private readonly http: HttpClient
  ) {}

  createPaymentIntent(params: any): Observable<PaymentIntent> {
    return this.http.post<PaymentIntent>(
      `http://localhost:8000/api/v1/payment`,
      params,
      { headers: { merchant: this.clientId } }
    );
  }
}
