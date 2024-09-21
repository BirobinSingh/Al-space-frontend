import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RoomsComponent } from './rooms/rooms.component';
import { AppRoutingModule } from '../app.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { RoomComponent } from './room/room.component';
import { BookingDialogComponent } from './booking-dialog/booking-dialog.component';
import { NgxStripeModule, StripeElementsDirective, StripePaymentElementComponent} from 'ngx-stripe';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { PaymentComponent } from './payment/payment.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PlutoService } from './payment/core/pluto.service';
import { PLUTO_ID } from './payment/core/pluto.service';




@NgModule({
  declarations: [
    RoomsComponent,
    RoomComponent,
    BookingDialogComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxStripeModule,
    MatButtonModule,
    MatDialogModule,
    StripeElementsDirective,
    StripePaymentElementComponent,
    MatCardModule,
    MatDividerModule,
    MatInputModule,
    MatToolbarModule,

  ],
  providers:[
    CurrencyPipe,
    PlutoService,
    { provide: PLUTO_ID, useValue: 'your-actual-client-id' }
  ],
  exports:[
    PaymentComponent
  ]
})
export class UserModule { }
