import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  template: `
    <div class="dialog-container">
      <h1 class="dialog-title">Ngx Stripe</h1>
      <div class="dialog-content">
        <span class="message-type">{{ data.type | uppercase }}:</span> 
        <span class="message">{{ data.message }}</span>
      </div>
      <div class="dialog-actions">
        <button class="close-button" mat-dialog-close>OK</button>
      </div>
    </div>
`,
  styles: [`
    .dialog-container {
      font-family: Arial, sans-serif;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      max-width: 400px;
      margin: 0 auto;
    }
    .dialog-title {
      font-size: 24px;
      color: #333;
      margin-bottom: 16px;
      text-align: center;
    }
    .dialog-content {
      margin-bottom: 20px;
      line-height: 1.5;
    }
    .message-type {
      font-weight: bold;
      color: #e74c3c;
    }
    .message {
      color: #333;
    }
    .dialog-actions {
      text-align: right;
    }
    .close-button {
      background-color: #3498db;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s;
    }
    .close-button:hover {
      background-color: #2980b9;
    }
  `],
  standalone: true,
  imports: [CommonModule],
})
export class NgxStripeDialogComponent {
  data = inject<{ type: 'error' | 'success'; message?: string }>(MAT_DIALOG_DATA);

  constructor(
    public dialogRef: MatDialogRef<NgxStripeDialogComponent>
  ) { }
  onClick(): void {
    this.dialogRef.close();
  }
}
