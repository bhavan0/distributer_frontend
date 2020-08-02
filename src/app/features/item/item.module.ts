import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsHomeComponent } from './items-home/items-home.component';
import { ItemRoutingModule } from './item-routing.module';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule, CalendarModule } from 'primeng';
import { ToastModule } from 'primeng/toast';
import { AddItemComponent } from './add-item/add-item.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { AddUpdateItenaryComponent } from './add-update-itenary/add-update-itenary.component';

@NgModule({
  declarations: [
    ItemsHomeComponent,
    AddItemComponent,
    ItemDetailsComponent,
    AddUpdateItenaryComponent
  ],
  imports: [
    CommonModule,
    ItemRoutingModule,
    TableModule,
    DynamicDialogModule,
    DialogModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    CalendarModule
  ]
})
export class ItemModule { }
