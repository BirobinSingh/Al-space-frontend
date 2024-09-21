import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateSpaceComponent } from './private-space/private-space.component';
import { OpenSpaceComponent } from './open-space/open-space.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { FormComponent } from './form/form.component';
import { AppRoutingModule } from '../app.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponentComponent } from './home-component/home-component.component';
import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DeleteDialogContentComponent } from './delete-dialog-content/delete-dialog-content.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    PrivateSpaceComponent,
    OpenSpaceComponent,
    DialogBoxComponent,
    FormComponent,
    HomeComponentComponent,
    DialogContentComponent,
    DialogBoxComponent,
    DeleteDialogContentComponent
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    AppRoutingModule, 
    ReactiveFormsModule ,
    MatDialogModule,
    MatButtonModule,
    MatIconModule

  ],
  exports:[
    PrivateSpaceComponent,
    OpenSpaceComponent,
    FormComponent,
    HomeComponentComponent
  ]
})
export class SpaceModule { 

}
