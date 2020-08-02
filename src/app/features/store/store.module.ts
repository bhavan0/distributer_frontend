import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoresHomeComponent } from './stores-home/stores-home.component';
import { StoreRoutingModule } from './store-routing.module';
import {
  TableModule, DynamicDialogModule, DialogModule,
  InputTextModule, ButtonModule, ToastModule, TreeTableModule, SharedModule, CalendarModule, DropdownModule, InputTextareaModule
} from 'primeng';
import { FormsModule } from '@angular/forms';
import { StoreDetailsComponent } from './store-details/store-details.component';
import { AddStoreComponent } from './add-store/add-store.component';
import { AddUpdateStoreItemsComponent } from './add-update-store-items/add-update-store-items.component';
import { AddUpdatePaymentComponent } from './add-update-payment/add-update-payment.component';

@NgModule({
  declarations: [
    StoresHomeComponent,
    StoreDetailsComponent,
    AddStoreComponent,
    AddUpdateStoreItemsComponent,
    AddUpdatePaymentComponent],
  imports: [
    CommonModule,
    StoreRoutingModule,
    TableModule,
    DynamicDialogModule,
    DialogModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    TreeTableModule,
    SharedModule,
    CalendarModule,
    DropdownModule,
    InputTextareaModule
  ]
})
export class StoreModule { }
