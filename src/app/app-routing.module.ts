import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'items'
  },
  {
    path: 'items',
    loadChildren: () => import('./features/item/item.module').then(m => m.ItemModule)
  },
  {
    path: 'stores',
    loadChildren: () => import('./features/store/store.module').then(m => m.StoreModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
