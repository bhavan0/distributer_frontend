import { Component, OnInit } from '@angular/core';
import { DialogService, MessageService } from 'primeng';
import { Stores } from 'src/app/shared/models/stores.model';
import { DataService } from 'src/app/core/data-service';
import { StoreDetailsComponent } from '../store-details/store-details.component';

@Component({
  selector: 'app-stores-home',
  templateUrl: './stores-home.component.html',
  styleUrls: ['./stores-home.component.css'],
  providers: [DialogService, MessageService]
})
export class StoresHomeComponent implements OnInit {

  cols: any[] = [];
  stores: Stores[] = [];
  selectedStore: Stores;
  storeDetailsRef: any;

  constructor(
    private dataService: DataService,
    private dialogService: DialogService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'Address', header: 'Cost Price' },
    ];
    this.getAllStores();
  }

  getAllStores() {
    this.dataService.getAllStores().subscribe(data => {
      this.stores = data;
    });
  }

  onAddStore() {
    // this.storeDetailsRef = this.dialogService.open(ItemDetailsComponent, {
    //   header: 'Item Details',
    //   width: '680px',
    //   data: {
    //     isAddMode: true
    //   }
    // });

    // this.storeDetailsRef.onClose.subscribe((updatedItem: Stores) => {
    //   if (updatedItem.name) {
    //     this.displayToaster();
    //     this.getAllStores();
    //   }
    // });

  }

  onStoreSelect(store: Stores) {
    this.storeDetailsRef = this.dialogService.open(StoreDetailsComponent, {
      header: 'Store Details',
      width: '880px',
      data: {
        storeData: store,
        isAddMode: false
      }
    });

    this.storeDetailsRef.onClose.subscribe((updatedStore: Stores) => {
      if (updatedStore.id) {
        this.displayToaster();
        const index = this.stores.map(x => x.id).indexOf(this.selectedStore.id);
        this.stores[index] = updatedStore;
      }
    });
  }

  displayToaster(isAddMode = false) {
    this.messageService
      .add({
        severity: 'success',
        detail: isAddMode ? 'Store added successfully' : 'Store updated successfully'
      });
  }

}
