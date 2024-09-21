import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../api.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-delete-dialog-content',
  templateUrl: './delete-dialog-content.component.html',
  styleUrl: './delete-dialog-content.component.css'
})
export class DeleteDialogContentComponent {

  constructor(public dialogRef: MatDialogRef<DeleteDialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService
  ) { }

  name: string = this.data.name
  id: number = this.data.id


  close(value: any): void {
    if (value == 1) {
      if (this.name == 'Cabin') {
        console.log(this.name);
        this.apiService.deleteCabin(this.id).subscribe();
      }
      if (this.name == 'Service') {
        console.log(this.name);
        this.apiService.deleteService(this.id).subscribe();
      }
    }
    this.dialogRef.close();
  }
}
