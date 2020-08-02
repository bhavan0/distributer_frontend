import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StoresHomeComponent } from './stores-home/stores-home.component';
import { StoreDetailsComponent } from './store-details/store-details.component';

const routes: Routes = [
    {
        path: '',
        component: StoresHomeComponent
    },
    {
        path: 'details/:id',
        component: StoreDetailsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StoreRoutingModule { }
