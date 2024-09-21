import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-booking-dialog',
  templateUrl: './booking-dialog.component.html',
  styleUrls: ['./booking-dialog.component.css']
})
export class BookingDialogComponent implements OnInit {

  cabinForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BookingDialogComponent>
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.cabinForm = this.fb.group({
      name: ['', Validators.required],
      phNumber: ['', [Validators.required, Validators.min(1)]]
    });
  }
  handlePayNow():void{
    this.dialogRef.close();
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
