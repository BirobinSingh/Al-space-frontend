import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.css']
})
export class DialogContentComponent implements OnInit {

  cabinForm!: FormGroup;
  submitError: string = '';
  submitSuccess: boolean = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<DialogContentComponent>
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.cabinForm = this.fb.group({
      name: ['', Validators.required],
      noOfSeat: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
      code: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.cabinForm.invalid) {
      console.log("Form validation failed.");
      return;
    }

    this.apiService.addCabin(this.cabinForm.value).subscribe({
      next: (response) => {
        console.log('Cabin created successfully:', response);
        this.submitSuccess = true;
        this.submitError = '';
        this.cabinForm.reset(); // Reset the form after successful submission
        this.dialogRef.close();
      },
      error: (error) => {
        console.error('Error creating cabin:', error);
        this.submitError = 'An error occurred while creating the cabin. Please try again.';
        this.submitSuccess = false;
      }
    });
  }
}





























// import { Component, NgZoneOptions, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ApiService } from '../../api.service';
// import { MatDialogRef } from '@angular/material/dialog';
// import { finalize } from 'rxjs';

// @Component({
//   selector: 'app-dialog-content',
//   templateUrl: './dialog-content.component.html',
//   styleUrl: './dialog-content.component.css'
// })
// export class DialogContentComponent implements OnInit {


//   cabinForm!: FormGroup;
//   submitError: string = '';
//   submitSuccess: boolean = false;

//   constructor(private fb: FormBuilder,
//     private apiService: ApiService,
//     private dialogRef:MatDialogRef<DialogContentComponent>
//   ) { }

//   ngOnInit(): void {
//     this.cabinForm = this.fb.group({
//       name: ['', Validators.required],
//       noOfSeat: ['', [Validators.required, Validators.min(1)]],
//       price: ['', [Validators.required, Validators.min(0)]],
//       code: ['', Validators.required]
//     });
//   }

//   onSubmit() {
//     if (this.cabinForm.valid) {
//       this.apiService.addCabin(this.cabinForm.value).subscribe({
//         next: (response) => {
//           console.log('Cabin created successfully:', response);
//           this.submitSuccess = true;
//           this.submitError = '';
//           this.cabinForm.reset(); // Reset the form after successful submission
//         },
//         error: (error) => {
//           console.error('Error creating cabin:', error);
//           this.submitError = 'An error occurred while creating the cabin. Please try again.';
//           this.submitSuccess = false;
//         }
//       });
//     } else {
//       console.log("Somwthing went wrong!!")
//     }
//      this.dialogRef.close();
//   }
// }
