import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'items',
    loadChildren: () => import('./features/item/item.module').then(m => m.ItemModule)
  },
  {
    path: 'stores',
    loadChildren: () => import('./features/store/store.module').then(m => m.StoreModule)
  },
  {
    path: 'payments',
    loadChildren: () => import('./features/payment/payment.module').then(m => m.PaymentModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
