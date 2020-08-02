import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/shared/models/item.model';
import { DataService } from 'src/app/core/data-service';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng';
import { AddItemComponent } from '../add-item/add-item.component';
import { Router } from '@angular/router';
import SharedService from '../../../shared/service/shared.service';

@Component({
  selector: 'app-items-home',
  templateUrl: './items-home.component.html',
  styleUrls: ['./items-home.component.scss'],
  providers: [DialogService, MessageService]
})
export class ItemsHomeComponent implements OnInit {

  cols: any[] = [];
  items: Item[] = [];
  selectedItem: Item;
  itemDetailsRef: any;

  constructor(
    private dataService: DataService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'costPrice', header: 'Cost Price' },
      { field: 'sellingPrice', header: 'Selling Price' }
    ];
    this.getAllItems();
  }

  getAllItems() {
    this.dataService.getAllItems().subscribe(data => {
      this.items = data;
    });
  }

  onAddItem() {
    this.itemDetailsRef = this.dialogService.open(AddItemComponent, {
      header: 'Item Details',
      width: '680px'
    });

    this.itemDetailsRef.onClose.subscribe((updatedItem: Item) => {
      if (updatedItem.name) {
        this.displayToaster();
        this.getAllItems();
      }
    });
  }

  onItemSelect(item: Item) {
    SharedService.item = item;
    this.router.navigate(['items/details', item.id]);
  }

  displayToaster() {
    this.messageService
      .add({
        severity: 'success',
        detail: 'Item updated successfully'
      });
  }
}
