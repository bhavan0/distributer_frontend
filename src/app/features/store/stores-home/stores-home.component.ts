import { Component, OnInit } from '@angular/core';
import { DialogService, MessageService } from 'primeng';
import { Store } from 'src/app/shared/models/store.model';
import { DataService } from 'src/app/core/data-service';
import { AddStoreComponent } from '../add-store/add-store.component';
import { Router } from '@angular/router';
import SharedService from 'src/app/shared/service/shared.service';

@Component({
  selector: 'app-stores-home',
  templateUrl: './stores-home.component.html',
  styleUrls: ['./stores-home.component.scss'],
  providers: [DialogService, MessageService]
})
export class StoresHomeComponent implements OnInit {

  cols: any[] = [];
  stores: Store[] = [];
  selectedStore: Store;
  storeDetailsRef: any;

  constructor(
    private dataService: DataService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'address', header: 'Address' },
    ];
    this.getAllStores();
  }

  getAllStores() {
    this.dataService.getAllStores().subscribe(data => {
      this.stores = data;
    });
  }

  onAddStore() {
    this.storeDetailsRef = this.dialogService.open(AddStoreComponent, {
      header: 'Store Details',
      width: '880px'
    });

    this.storeDetailsRef.onClose.subscribe((updatedStore: Store) => {
      if (updatedStore && updatedStore.name) {
        this.displayToaster();
        this.getAllStores();
      }
    });
  }

  onStoreSelect(store: Store) {
    this.router.navigate(['stores/details', store.id]);
    SharedService.store = store;
  }

  displayToaster() {
    this.messageService
      .add({
        severity: 'success',
        detail: 'Store updated successfully'
      });
  }
}
