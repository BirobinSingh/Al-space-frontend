import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { DeleteDialogContentComponent } from '../delete-dialog-content/delete-dialog-content.component';

@Component({
  selector: 'app-private-space',
  templateUrl: './private-space.component.html',
  styleUrls: ['./private-space.component.css']
})
export class PrivateSpaceComponent implements OnInit {

  services: any;
  private readonly dialog = inject(MatDialog);

  constructor(private apiService: ApiService, public dialog1: MatDialog) {}

  ngOnInit(): void {
    this.loadServices();
    this.apiService.subject34$.subscribe(() => this.loadServices());
  }

  private loadServices(): void {
    this.apiService.getService().subscribe(response => {
      this.services = response;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      height: '800px',
      width: '1200px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  handleClick(id: any): void {
    console.log(id);
    this.dialog1.open(DeleteDialogContentComponent, {
      width: '250px',
      data: { name: 'Service', id } 
    });
  }
}




































// import { Component, OnInit ,inject } from '@angular/core';

// import { ApiService } from '../../api.service';
// import {MatDialog} from '@angular/material/dialog';
// import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
// import { DeleteDialogContentComponent } from '../delete-dialog-content/delete-dialog-content.component';

// @Component({
//   selector: 'app-private-space',
//   // standalone: true,
//   // imports: [],
//   templateUrl: './private-space.component.html',
//   styleUrl: './private-space.component.css'
// })
// export class PrivateSpaceComponent implements OnInit {
//   constructor(private apiService:ApiService,
//     public dialog1: MatDialog
//   ){

//   }


//   readonly dialog = inject(MatDialog);
//   openDialog() {
//     const dialogRef = this.dialog.open(DialogBoxComponent,{
//       height: '800px',
//       width: '1200px',
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       console.log(`Dialog result: ${result}`);
//     });
//   }


//   handleClick(id:any)
//   {
//     console.log(id);
//    // this.apiService.deleteService(id).subscribe();
//     this.dialog1.open(DeleteDialogContentComponent, {
//       width: '250px',
//       data: { name: 'Service',id:id } // Pass data to dialog if needed
//     });
//   }


//   services:any
//   ngOnInit(): void {
//     this.apiService.getService().subscribe(response=>{
//       this.services=response
//     });
  
//     this.apiService.subject34$.subscribe(()=>{
//       this.apiService.getService().subscribe(response=>{
//         this.services=response
//       }
//       )
//     })
//   }

// }


