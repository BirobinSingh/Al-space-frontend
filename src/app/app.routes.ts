import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './space/form/form.component';
import { NgModule } from '@angular/core';
import { HomeComponentComponent } from './space/home-component/home-component.component';
import { PrivateSpaceComponent } from './space/private-space/private-space.component';
import { OpenSpaceComponent } from './space/open-space/open-space.component';
import { RoomsComponent } from './user/rooms/rooms.component';
import { RoomComponent } from './user/room/room.component';
import { CreatorComponent } from './job-module/creator/creator.component';
import { ViewerComponent } from './job-module/viewer/viewer.component';
import { PaymentComponent } from './user/payment/payment.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponentComponent
    },
    {
        path:'form-module/:name/:availableSeats/:id',
        component:FormComponent
    },
     {
        path:'home',
        component:HomeComponentComponent
     },
     {
        path:'services',
        component:PrivateSpaceComponent
     },
    {
        path:'cabins',
        component:OpenSpaceComponent
    },
    {
        path:'user-spaces',
        component:RoomsComponent
    },
    {
        path:'room/:name/:availableSeats/:id/:bookedPrice',
        component:RoomComponent
    },
    {
        path:'creator-component',
        component:CreatorComponent
    },
    {
        path:'viewer-component',
        component:ViewerComponent
    },
    {
        path:'payment-component',
        component:PaymentComponent
    }
];

@NgModule({
    imports:[
        RouterModule.forRoot(routes)
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule{

}