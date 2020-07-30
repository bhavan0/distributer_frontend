import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ItemsHomeComponent } from './items-home/items-home.component';

const routes: Routes = [
    {
        path: '',
        component: ItemsHomeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ItemRoutingModule { }
