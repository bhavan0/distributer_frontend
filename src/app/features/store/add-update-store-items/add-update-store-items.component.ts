import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng';
import { DataService } from 'src/app/core/data-service';
import { StoreItem } from 'src/app/shared/models/store-item.model';
import moment from 'moment';
import { Item } from 'src/app/shared/models/item.model';

@Component({
  selector: 'app-add-update-store-items',
  templateUrl: './add-update-store-items.component.html',
  styleUrls: ['./add-update-store-items.component.scss']
})
export class AddUpdateStoreItemsComponent implements OnInit {

  storeId: number;
  storeItem: StoreItem;
  isEditCase = false;
  items: Item[];
  itemId: number;
  selectedItem: Item;

  constructor(
    public ref: DynamicDialogRef,
    private dataService: DataService,
    private config: DynamicDialogConfig
  ) {
    if (this.config.data.storeId) {
      this.storeId = this.config.data.storeId;
    }
    if (this.config.data.storeItem) {
      this.storeItem = this.config.data.storeItem;
      this.itemId = this.storeItem.itemId;
      this.storeItem.dateObject = new Date(this.storeItem.date);
      this.isEditCase = true;
    }
  }

  ngOnInit(): void {
    if (!this.isEditCase) {
      this.storeItem = new StoreItem();
    }
    this.getItems();
  }

  getItems() {
    this.dataService.getAllItems().subscribe(data => {
      this.items = data;
      this.selectedItem = this.items.filter(x => x.id === this.itemId).shift();
    });
  }

  disableSave(): boolean {
    if (this.storeItem) {
      if (!this.storeItem || !this.storeItem.boughtCount || !this.storeItem.itemId) {
        return true;
      }
    }
    return false;
  }

  closeDialogBox(storeItem: StoreItem = null) {
    this.ref.close(storeItem);
  }

  saveStoreItem() {
    this.storeItem.date = moment(this.storeItem.dateObject).format('YYYY-MM-DD');
    this.storeItem.storeId = this.storeId;
    if (this.isEditCase) {
      this.dataService.updateStoreItem(this.storeItem).subscribe(data => {
        this.closeDialogBox(this.storeItem);
      });
    } else {
      this.dataService.addStoreItem(this.storeItem).subscribe(data => {
        this.closeDialogBox(this.storeItem);
      });
    }
  }

  selectItem(item: Item) {
    this.storeItem.itemId = item.id;
  }
}
