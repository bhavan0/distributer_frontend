import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsHomeComponent } from './items-home/items-home.component';
import { ItemRoutingModule } from './item-routing.module';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [ItemsHomeComponent],
  imports: [
    CommonModule,
    ItemRoutingModule,
    TableModule
  ]
})
export class ItemModule { }
