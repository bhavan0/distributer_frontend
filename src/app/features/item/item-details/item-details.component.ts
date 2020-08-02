import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/core/data-service';
import { Item } from 'src/app/shared/models/item.model';
import { Itenary } from 'src/app/shared/models/itenary.model';
import SharedService from '../../../shared/service/shared.service';
import { DialogService, MessageService } from 'primeng';
import { AddUpdateItenaryComponent } from '../add-update-itenary/add-update-itenary.component';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
  providers: [DialogService, MessageService]
})
export class ItemDetailsComponent implements OnInit, OnDestroy {

  itemId: number;
  private sub: any;
  item: Item;
  oldItem: Item;
  itenary: Itenary[] = [];
  itemDataLoaded = false;
  itenaryDataLoaded = false;
  cols: any[] = [];
  itenaryRef: any;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private dialogService: DialogService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'date', header: 'Date' },
      { field: 'boughtCount', header: 'Bought Count' },
      { field: 'soldCount', header: 'Sold Count' }
    ];
    this.sub = this.route.params.subscribe(params => {
      this.itemId = +params['id']; // (+) converts string 'id' to a number
      this.getItem();
      this.getItemItenary();
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getItem() {
    this.item = SharedService.item;
    this.oldItem = { ...this.item };
    if (!this.item) {
      this.getItemById();
    } else {
      this.itemDataLoaded = true;
    }
  }

  getItemById() {
    this.dataService.getItemById(this.itemId).subscribe(data => {
      this.item = data;
      this.oldItem = { ...data };
      this.itemDataLoaded = true;
    });
  }

  getItemItenary() {
    this.dataService.getItemItenary(this.itemId).subscribe(data => {
      this.itenary = data;
      this.itenaryDataLoaded = true;
    });
  }

  getTotalBoughtCount(): number {
    if (this.itenary.length) {
      return this.itenary?.map(o => o.boughtCount)?.reduce((a, c) => a + c);
    }
    return 0;
  }

  getTotalSoldCount(): number {
    if (this.itenary.length) {
      return this.itenary?.map(o => o.soldCount)?.reduce((a, c) => a + c);
    }
    return 0;
  }

  getTotalProfit(): number {
    return (this.getTotalSoldCount() * this.item?.sellingPrice) - (this.getTotalBoughtCount() * this.item?.costPrice);
  }

  disableSave(): boolean {
    if (this.item) {
      if (!this.item.name || this.item.name === ''
        || !this.item.costPrice || !this.item.sellingPrice) {
        return true;
      }
    }
    if (JSON.stringify(this.oldItem) === JSON.stringify(this.item)) {
      return true;
    }
    return false;
  }

  saveItem() {
    this.dataService.updateItem(this.item).subscribe(data => {
      this.router.navigate(['items']);
    });
  }

  onAddItenary() {
    this.itenaryRef = this.dialogService.open(AddUpdateItenaryComponent, {
      header: 'Add Itenary',
      width: '680px',
      data: {
        itemId: this.itemId
      }
    });

    this.itenaryRef.onClose.subscribe((updatedItem: Itenary) => {
      if (updatedItem && updatedItem.date) {
        this.displayToaster();
        this.getItemItenary();
      }
    });
  }

  onEditItenary(itenary: Itenary) {
    this.itenaryRef = this.dialogService.open(AddUpdateItenaryComponent, {
      header: 'Edit Itenary',
      width: '680px',
      data: {
        itenary: itenary,
        itemId: this.itemId
      }
    });

    this.itenaryRef.onClose.subscribe((updatedItem: Itenary) => {
      if (updatedItem && updatedItem.date) {
        this.displayToaster(true);
        this.getItemItenary();
      }
    });
  }

  displayToaster(isEdit = false) {
    this.messageService
      .add({
        severity: 'success',
        detail: isEdit ? 'Itenary Added successfully' : 'Itenary Updated successfully'
      });
  }
}
