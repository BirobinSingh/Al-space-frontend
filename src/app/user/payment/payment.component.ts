import { Component, OnInit, ViewChild, inject, ChangeDetectorRef , signal} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StripeElementsOptions } from '@stripe/stripe-js';
import { injectStripe } from 'ngx-stripe';
import { PlutoService, STRIPE_PUBLIC_KEY } from './core/pluto.service';
import { NgxStripeDialogComponent } from './core/dialog.component';
import { StripePaymentElementComponent } from 'ngx-stripe';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;

  readonly fb = inject(FormBuilder);
  readonly dialog = inject(MatDialog);
  readonly plutoService = inject(PlutoService);
  readonly stripe = injectStripe(STRIPE_PUBLIC_KEY);

  checkoutForm = this.fb.group({
    name: ['Ricardo', [Validators.required]],
    email: ['support@ngx-stripe.dev', [Validators.required, Validators.email]],
    address: ['Av. Ramon Nieto 313B 2D', [Validators.required]],
    zipcode: ['36205', [Validators.required, Validators.pattern(/^\d{5}$/)]],
    city: ['Vigo', [Validators.required]],
    amount: [2500, [Validators.required, Validators.pattern(/^\d+$/)]],
  });

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
    appearance: {
      theme: 'stripe',
      labels: 'floating',
      variables: {
        colorPrimary: '#673ab7',
      },
    },
  };

  paying = signal(false);

  constructor(private cd: ChangeDetectorRef, private apiService: ApiService) {}

  get amount() {
    const amountValue = this.checkoutForm.get('amount')?.value;
    return amountValue ? Number(amountValue) / 100 : 0;
  }

  ngOnInit() {
    const amount = this.checkoutForm.get('amount')?.value;
    if (amount) {
      this.plutoService.createPaymentIntent({ amount, currency: 'inr' })
        .subscribe({
          next: (pi) => {
            this.elementsOptions.clientSecret = pi.client_secret as string;
          },
          error: (err) => {
            console.error('Failed to create payment intent', err);
          }
        });
    }
  }

  clear() {
    this.checkoutForm.reset();
  }

  collectPayment() {
    if (this.paying() || this.checkoutForm.invalid) return;

    this.paying.set(true);
    const { name, email, address, zipcode, city } = this.checkoutForm.getRawValue();

    this.stripe.confirmPayment({
      elements: this.paymentElement.elements,
      confirmParams: {
        payment_method_data: {
          billing_details: {
            name: name as string,
            email: email as string,
            address: {
              line1: address as string,
              postal_code: zipcode as string,
              city: city as string,
            },
          },
        },
      },
      redirect: 'if_required',
    }).subscribe({
      next: (result) => {
        this.paying.set(false);
        if (result.error) {
          this.dialog.open(NgxStripeDialogComponent, {
            data: { type: 'error', message: result.error.message },
          });
        } else if (result.paymentIntent.status === 'succeeded') {
          this.apiService.updateBooking({
            transactionId: result.paymentIntent.id,
            status: 'Confirmed',
            name: name as string,
            email: email as string,
            address: address as string,
            bookingId: 4
          }).subscribe(response => {
            console.log(response);
          });

          this.dialog.open(NgxStripeDialogComponent, {
            data: { type: 'success', message: 'Payment processed successfully' },
          });
        }
      },
      error: (err) => {
        this.paying.set(false);
        this.dialog.open(NgxStripeDialogComponent, {
          data: { type: 'error', message: err.message || 'Unknown Error' },
        });
      },
    });
  }
}

































// import { Component, OnInit, ViewChild, inject, signal, } from '@angular/core';
// import { FormBuilder, Validators } from '@angular/forms';
// import { MatDialog } from '@angular/material/dialog';
// import { StripeElementsOptions } from '@stripe/stripe-js';
// import { injectStripe } from 'ngx-stripe';
// import { PlutoService, STRIPE_PUBLIC_KEY } from './core/pluto.service';
// import { NgxStripeDialogComponent } from './core/dialog.component';
// import { StripePaymentElementComponent } from 'ngx-stripe';
// import { ChangeDetectorRef } from '@angular/core';
// import { ApiService } from '../../api.service';

// @Component({
//   selector: 'app-payment',
//   templateUrl: './payment.component.html',
//   styleUrl: './payment.component.css'
// })
// export class PaymentComponent implements OnInit {
//   @ViewChild(StripePaymentElementComponent)
//   paymentElement!: StripePaymentElementComponent;

//   constructor(private cd: ChangeDetectorRef,
//     private apiService: ApiService
//   ) { }
//   private readonly fb = inject(FormBuilder);
//   private readonly dialog = inject(MatDialog);
//   private readonly plutoService = inject(PlutoService);
//   readonly stripe = injectStripe(STRIPE_PUBLIC_KEY);

//   checkoutForm = this.fb.group({
//     name: ['Ricardo', [Validators.required]],
//     email: ['support@ngx-stripe.dev', [Validators.required]],
//     address: ['Av. Ramon Nieto 313B 2D', [Validators.required]],
//     zipcode: ['36205', [Validators.required]],
//     city: ['Vigo', [Validators.required]],
//     amount: [2500, [Validators.required, Validators.pattern(/\d+/)]],
//   });

//   elementsOptions: StripeElementsOptions = {
//     locale: 'en',
//     appearance: {
//       theme: 'stripe',
//       labels: 'floating',
//       variables: {
//         colorPrimary: '#673ab7',
//       },
//     },
//   };

//   paying = signal(false);

//   get amount() {
//     const amountValue = this.checkoutForm.get('amount')?.value;
//     if (!amountValue || amountValue < 0) return 0;

//     return Number(amountValue) / 100;
//   }

//   ngOnInit() {
//     const amount = this.checkoutForm.get('amount')?.value;
//     this.plutoService
//       .createPaymentIntent({
//         amount,
//         currency: 'inr',
//       })
//       .subscribe({
//         next: (pi) => {
//           this.elementsOptions.clientSecret = pi.client_secret as string;
//         },
//         error: (err) => {
//           console.error('Failed to create payment intent', err);
//         }
//       });
//   }

//   clear() {
//     this.checkoutForm.patchValue({
//       name: '',
//       email: '',
//       address: '',
//       zipcode: '',
//       city: '',
//     });
//   }

//   collectPayment() {
//     if (this.paying() || this.checkoutForm.invalid) return;
//     this.paying.set(true);

//     const { name, email, address, zipcode, city } =
//       this.checkoutForm.getRawValue();

//     this.stripe
//       .confirmPayment({
//         elements: this.paymentElement.elements,
//         confirmParams: {
//           payment_method_data: {
//             billing_details: {
//               name: name as string,
//               email: email as string,
//               address: {
//                 line1: address as string,
//                 postal_code: zipcode as string,
//                 city: city as string,
//               },
//             },
//           },
//         },
//         redirect: 'if_required',
//       })
//       .subscribe({
//         next: (result) => {
//           this.paying.set(false);
//           if (result.error) {
//             this.dialog.open(NgxStripeDialogComponent, {
//               data: {
//                 type: 'error',
//                 message: result.error.message,
//               },
//             });
//           } else if (result.paymentIntent.status === 'succeeded') {
//             this.apiService.updateBooking({
//               "transactionId": result.paymentIntent.id,
//               "status": "Confirmed",
//               "name": this.checkoutForm.get('name')?.value,
//               "email": this.checkoutForm.get('email')?.value,
//               "address": this.checkoutForm.get('address')?.value,
//               "bookingId": 3
//             }).subscribe(response => {

//               console.log(response);
//             })

//             this.dialog.open(NgxStripeDialogComponent, {
//               data: {
//                 type: 'success',
//                 message: 'Payment processed successfully',
//               },
//             });
//           }
//         },
//         error: (err) => {
//           this.paying.set(false);
//           this.dialog.open(NgxStripeDialogComponent, {
//             data: {
//               type: 'error',
//               message: err.message || 'Unknown Error',
//             },
//           });
//         },
//       });
//   }
// }

// // bootstrapApplication(App, {
// //   providers: [
// //     provideAnimationsAsync(),
// //     importProvidersFrom(ReactiveFormsModule),
// //     provideHttpClient(),
// //     provideNgxStripe(),
// //     {
// //       provide: PLUTO_ID,
// //       useValue: '449f8516-791a-49ab-a09d-50f79a0678b6',
// //     },
// //   ],
// // });
