import { Component, OnInit } from '@angular/core';
import { Items } from 'src/app/shared/models/items.model';
import { DataService } from 'src/app/core/data-service';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng';
import { AddItemComponent } from '../add-item/add-item.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-items-home',
  templateUrl: './items-home.component.html',
  styleUrls: ['./items-home.component.css'],
  providers: [DialogService, MessageService]
})
export class ItemsHomeComponent implements OnInit {

  cols: any[] = [];
  items: Items[] = [];
  selectedItem: Items;
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

    this.itemDetailsRef.onClose.subscribe((updatedItem: Items) => {
      if (updatedItem.name) {
        this.displayToaster();
        this.getAllItems();
      }
    });

  }

  onItemSelect(item: Items) {
    this.router.navigate(['items/details', item.id]);
  }

  displayToaster(isAddMode = false) {
    this.messageService
      .add({
        severity: 'success',
        detail: isAddMode ? 'Item added successfully' : 'Item updated successfully'
      });
  }
}
