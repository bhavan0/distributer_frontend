import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PaymentHomeComponent } from './payment-home/payment-home.component';

const routes: Routes = [
    {
        path: '',
        component: PaymentHomeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PaymentRoutingModule { }
