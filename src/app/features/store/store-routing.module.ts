import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StoresHomeComponent } from './stores-home/stores-home.component';

const routes: Routes = [
    {
        path: '',
        component: StoresHomeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StoreRoutingModule { }
