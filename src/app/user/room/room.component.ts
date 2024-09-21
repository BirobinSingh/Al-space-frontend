import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../api.service';
import { ActivatedRoute } from '@angular/router';
import { BookingDialogComponent } from '../booking-dialog/booking-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})

export class RoomComponent implements OnInit {
  services: any;
  array: number[] = [];
  masterServices: any;

  name = this.route.snapshot.paramMap.get("name");
  availableSeats = this.route.snapshot.paramMap.get("availableSeats");
  id = this.route.snapshot.paramMap.get("id");
  cabinPrice: number = 0;
  price: number = 0;

  numberOfDays: number = 30;
  body: {} = {};
  bookingId: any;

  readonly dialog = inject(MatDialog);

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.initializePrice();
    this.fetchCabinServices();
    this.fetchMasterServices();
  }

  private initializePrice(): void {
    const bookedPriceStr = this.route.snapshot.paramMap.get("bookedPrice");
    this.price = bookedPriceStr ? parseFloat(bookedPriceStr) : 0;
  }

  private fetchCabinServices(): void {
    this.apiService.getCabinService(this.id).subscribe({
      next: (response) => {
        this.services = response.result;
        this.calculateTotalPrice();
      },
      error: (err) => {
        console.error('Error fetching cabin services:', err);
      }
    });
  }

  private calculateTotalPrice(): void {
    this.price = this.services.reduce((sum: number, service: any) => {
      const parsedPrice = parseFloat(service.Price);
      return sum + (isNaN(parsedPrice) ? 0 : parsedPrice);
    }, this.price);
    this.cabinPrice = this.price;
    console.log('Total Price:', this.price);
  }

  private fetchMasterServices(): void {
    this.apiService.getService().subscribe({
      next: (response) => {
        this.masterServices = response;
        this.array = new Array(this.masterServices.length).fill(0);
      },
      error: (err) => {
        console.error('Error fetching master services:', err);
      }
    });
  }

  updatedPrice(numberOfDays: any): void {
    const days = parseFloat(numberOfDays);
    this.price = (this.cabinPrice / 30) * days;
    this.numberOfDays = days;
  }

  toggleCabService(index: number): void {
    this.array[index] = this.array[index] === 0 ? 1 : 0;
    const servicePrice = parseFloat(this.masterServices[index].Price);
    this.price += this.array[index] === 1 ? servicePrice : -servicePrice;
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(BookingDialogComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  handleBooking(): void {
    this.body = {
      tenantId: "tenant123",
      price: this.price,
      cabinId: this.id,
      status: 'pending',
      noOfDays: this.numberOfDays
    };
    this.apiService.addboooking(this.body).subscribe({
      next: (response) => {
        this.bookingId = response.insertId;
        this.updateCabin();
      },
      error: (err) => {
        console.error('Error adding booking:', err);
      }
    });
  }

  private updateCabin(): void {
    this.apiService.updateCabin({
      bookedPrice: this.price,
      tenantId: "tenant123",
      bookingId: this.bookingId
    }, this.id).subscribe({
      next: (response) => {
        console.log(response);
        this.openDialog();
        setTimeout(() => this.executeNewApiCall(), 60000);
      },
      error: (err) => {
        console.error('Error updating cabin:', err);
      }
    });
  }

  private executeNewApiCall(): void {
    this.apiService.updateCabinTransaction({ cabinId: this.id }).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.error('Error executing new API call:', err);
      }
    });
  }
}


































// import { Component, OnInit, AfterViewInit, ViewChild, inject } from '@angular/core';
// import { ApiService } from '../../api.service';
// import { ActivatedRoute } from '@angular/router';
// import { BookingDialogComponent } from '../booking-dialog/booking-dialog.component';
// import { MatDialog } from '@angular/material/dialog';

// @Component({
//   selector: 'app-room',
//   templateUrl: './room.component.html',
//   styleUrls: ['./room.component.css']
// })
// export class RoomComponent implements OnInit{

//   services: any;
//   array: number[] = [];
//   masterServices: any;

//   name = this._Activatedroute.snapshot.paramMap.get("name");
//   availableSeats = this._Activatedroute.snapshot.paramMap.get("availableSeats");
//   id = this._Activatedroute.snapshot.paramMap.get("id");
//   cabinPrice: number = 0;
//   price: number = 0;

//   constructor(
//     private _Activatedroute: ActivatedRoute,
//     private apiService: ApiService,
//   ) { }

//   ngOnInit(): void {
//     const bookedPriceStr = this._Activatedroute.snapshot.paramMap.get("bookedPrice");
//     this.price = bookedPriceStr ? parseFloat(bookedPriceStr) : 0;
//     this.apiService.getCabinService(this.id).subscribe(response => {
//       this.services = response.result;
//       console.log(this.services);
//       this.price = this.services.reduce((sum: any, service: any) => {
//         const parsedPrice = parseFloat(service.Price);
//         return sum + (isNaN(parsedPrice) ? 0 : parsedPrice);
//       }, this.price);
//       this.cabinPrice = this.price;
//       console.log('Total Price:', this.price);
//     },
//       error => {
//         console.error('Error fetching data:', error);
//       });
//     this.apiService.getService().subscribe(response => {
//       this.masterServices = response;
//       this.array = new Array(this.masterServices.length).fill(0);
//       console.log(this.masterServices);
//     });
//   }

//   numberOfDays: number = 30;
//   updatedPrice(numberOfDays: any): void {
//     const days = parseFloat(numberOfDays);
//     this.price = (this.price / 30) * numberOfDays;
//     this.numberOfDays = days;
//   }

//   cabServiceStatus(index: number): void {
//     this.array[index] = this.array[index] === 0 ? 1 : 0;
//     if (this.array[index] == 1) this.price += parseFloat(this.masterServices[index].Price);
//     if (this.array[index] == 0) this.price -= parseFloat(this.masterServices[index].Price);
//   }

//   readonly dialog = inject(MatDialog);
//   openDialog(): void {
//     const dialogRef = this.dialog.open(BookingDialogComponent, {
//       width: '350px',
//     });
//     dialogRef.afterClosed().subscribe(result => {
//       console.log(`Dialog result: ${result}`);
//     });
//   }

//   body: {} = {};
//   bookingId: any;

  


//   executeNewApiCall(): void {
//     this.apiService.updateCabinTransaction({ "cabinId": this.id }).subscribe(response => {
//       console.log(response);
//     });
//   }

//   handleBooking(): void {
//     this.body = {
//       "tenantRefId": "tenant123",
//       "price": this.price,
//       "cabinId": this.id,
//       "noOfSeat": this.availableSeats,
//       "noOfDays": this.numberOfDays
//     };
//     console.log(this.body);
//     this.apiService.addBoooking(this.body).subscribe(response => {
//       this.bookingId = response.insertId;
//       console.log(this.bookingId);
//       this.apiService.updateCabin({
//         "bookedPrice": this.price,
//         "tenantId": "tenant123",
//         "bookingId": this.bookingId
//       }, this.id).subscribe(response => {
//         console.log(response);

//         this.openDialog();

//         setTimeout(() => {
//           this.executeNewApiCall();
//         }, 60000);
//       });
//     });
//   }
// }
