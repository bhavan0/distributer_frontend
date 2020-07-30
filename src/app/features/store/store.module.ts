import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoresHomeComponent } from './stores-home/stores-home.component';
import { StoreRoutingModule } from './store-routing.module';
import { TableModule, DynamicDialogModule, DialogModule, InputTextModule, ButtonModule, ToastModule } from 'primeng';
import { FormsModule } from '@angular/forms';
import { StoreDetailsComponent } from './store-details/store-details.component';

@NgModule({
  declarations: [StoresHomeComponent, StoreDetailsComponent],
  imports: [
    CommonModule,
    StoreRoutingModule,
    TableModule,
    DynamicDialogModule,
    DialogModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule
  ]
})
export class StoreModule { }
