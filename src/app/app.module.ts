import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SpaceModule } from './space/space.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppRoutingModule } from './app.routes';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { RoomsComponent } from './user/rooms/rooms.component';
import { UserModule } from './user/user.module';
import { CreatorComponent } from './job-module/creator/creator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { JobModuleModule } from './job-module/job-module.module';
import { MatRadioModule } from '@angular/material/radio';
import { NgxStripeModule } from 'ngx-stripe';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    UserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatRadioModule,
    HttpClientModule,
    NgxStripeModule.forRoot(`pk_test_51MJVB7SIgdXqjWkRalg9W14ljeHlF0Pm0LfS50oUr7F62qsp0VmhIphg3oziap79ayqJE5kpBjBQjIKAnA2CYQSn00CD3B7pXw`),

  ],
  exports: [

  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
