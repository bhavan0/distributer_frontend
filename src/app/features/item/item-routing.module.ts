import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ItemsHomeComponent } from './items-home/items-home.component';
import { ItemDetailsComponent } from './item-details/item-details.component';

const routes: Routes = [
    {
        path: '',
        component: ItemsHomeComponent
    },
    {
        path: 'details/:id',
        component: ItemDetailsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ItemRoutingModule { }
