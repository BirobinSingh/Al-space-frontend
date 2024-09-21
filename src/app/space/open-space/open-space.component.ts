import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';
import { DeleteDialogContentComponent } from '../delete-dialog-content/delete-dialog-content.component';

@Component({
  selector: 'app-open-space',
  templateUrl: './open-space.component.html',
  styleUrls: ['./open-space.component.css']
})
export class OpenSpaceComponent implements OnInit {

  data: any;

  private readonly dialog = inject(MatDialog);

  constructor(
    private router: Router,
    private apiService: ApiService,
    public dialog1: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.apiService.cabinSubject$.subscribe(() => this.loadData());
  }

  private loadData(): void {
    this.apiService.getData().subscribe(response => {
      this.data = response;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  handleClick(id: any): void {
    this.dialog1.open(DeleteDialogContentComponent, {
      width: '250px',
      data: { name: 'Cabin', id }
    });
  }
}




































// import { Component, OnInit ,inject} from '@angular/core';
// import { Router } from '@angular/router';
// import { ApiService } from '../../api.service';
// // import {  Router } from '@angular/router';
// import {MatDialog} from '@angular/material/dialog';
// import { DialogContentComponent } from '../dialog-content/dialog-content.component';
// import { DeleteDialogContentComponent } from '../delete-dialog-content/delete-dialog-content.component';


// @Component({
//   selector: 'app-open-space',
//   standalone:false,
//   // imports: [],
//   templateUrl: './open-space.component.html',
//   styleUrl: './open-space.component.css'
// })
// export class OpenSpaceComponent  implements OnInit {
//   constructor(private router:Router,
//     private apiService:ApiService,
//     public dialog1: MatDialog,
//   ){}
  
//   readonly dialog = inject(MatDialog);

//   openDialog() {
//     const dialogRef = this.dialog.open(DialogContentComponent,{
//       // height: '400px',
//       width: '600px',
//     }
//     );
//     dialogRef.afterClosed().subscribe(result => {
//       console.log(`Dialog result: ${result}`);
//     });
//   }


// //   total_open_seats:number=0
// //  allocated_open_seats:number=0

// //  total_dedicated_seats:number=0
// //  allocated_dedicated_seats:number=0
 
//  data:any
//   ngOnInit(): void {
//       this.apiService.getData().subscribe(response=>{
//         this.data=response
//     });
    
//     this.apiService.cabinSubject$.subscribe(()=>{
//       this.apiService.getData().subscribe(response=>{
//         this.data=response;
//       })}
//     )
//   }

//   handleClick(id:any)
//   {
//     this.dialog1.open(DeleteDialogContentComponent, {
//       width: '250px',
//       data: { name: 'Cabin', id:id } 
//     });
//   }

// }
