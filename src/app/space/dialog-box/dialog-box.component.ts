import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {
  serviceForm!: FormGroup;
  submitError: string = '';
  submitSuccess: boolean = false;
  unitOptions: string[] = ['HR', 'WEEKLY', 'MIN', 'EACH', 'MONTHLY'];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<DialogBoxComponent>
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.serviceForm = this.fb.group({
      serviceName: ['', Validators.required],
      serviceType: ['', Validators.required],
      desc: ['', Validators.required],
      unit: this.fb.group({
        selectedUnit: ['', Validators.required]
      }),
      price: ['', [Validators.required, Validators.min(0)]],
      code: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.serviceForm.invalid) {
      console.log("Form validation failed.");
      return;
    }

    this.apiService.addService(this.serviceForm.value).subscribe({
      next: (response) => {
        console.log('Service created successfully:', response);
        this.submitSuccess = true;
        this.submitError = '';
        this.serviceForm.reset(); // Reset the form after successful submission
        this.dialogRef.close();
      },
      error: (error) => {
        console.error('Error creating service:', error);
        this.submitError = 'An error occurred while creating the service. Please try again.';
        this.submitSuccess = false;
      }
    });
  }
}














































// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ApiService } from '../../api.service';
// import { MatDialogRef } from '@angular/material/dialog';
// import { finalize } from 'rxjs/operators';

// @Component({
//   selector: 'app-dialog-box',
//   templateUrl: './dialog-box.component.html',
//   styleUrl: './dialog-box.component.css'
// })
// export class DialogBoxComponent {
//   serviceForm!: FormGroup;
//   submitError: string = '';
//   submitSuccess: boolean = false;

//   constructor(private fb: FormBuilder,
//     private apiService: ApiService,
//     public diaLogRef:MatDialogRef<DialogBoxComponent>
//   ) { }

//   ngOnInit(): void {
//     this.initForm();
//   }
//   unitOptions: string[] = ['HR', 'WEEKLY', 'MIN', 'EACH', 'MONTHLY'];
//   initForm(): void {
//     this.serviceForm = this.fb.group({
//       serviceName: ['', Validators.required],
//       serviceType: ['', Validators.required],
//       desc: ['', Validators.required],
//       unit: this.fb.group({
//         selectedUnit: ['', Validators.required]
//       }),
//       price: ['', [Validators.required, Validators.min(0)]],
//       code: ['', Validators.required]
//     });
//   }

//   onSubmit(): void {
//     if (this.serviceForm.valid) {
//       this.apiService.addService(this.serviceForm.value).subscribe({
//         next: (response) => {
//           console.log('Cabin created successfully:', response);
//           this.submitSuccess = true;
//           this.submitError = '';
//           this.serviceForm.reset(); // Reset the form after successful submission
//         },
//         error: (error) => {
//           console.error('Error creating cabin:', error);
//           this.submitError = 'An error occurred while creating the cabin. Please try again.';
//           this.submitSuccess = false;
//         }
//       });
//     }  else {
//       console.log("Somwthing went wrong!!")
//     }
//     this.diaLogRef.close();
//   }
// }