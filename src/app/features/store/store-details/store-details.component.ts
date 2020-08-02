import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/core/data-service';
import { Store } from 'src/app/shared/models/store.model';
import SharedService from 'src/app/shared/service/shared.service';
import { StoreDetails } from 'src/app/shared/models/store-details.model';
import { TreeNode, DialogService, MessageService } from 'primeng';
import { StoreItemsData } from 'src/app/shared/models/store-items-data.model';
import { DateStoreItemsData } from 'src/app/shared/models/date-store-items-data.moel';
import { Itenary } from 'src/app/shared/models/itenary.model';
import { AddUpdateStoreItemsComponent } from '../add-update-store-items/add-update-store-items.component';
import { StoreItem } from 'src/app/shared/models/store-item.model';
import { Payment } from 'src/app/shared/models/payment.model';
import { AddUpdatePaymentComponent } from '../add-update-payment/add-update-payment.component';

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.scss'],
  providers: [DialogService, MessageService]
})
export class StoreDetailsComponent implements OnInit {

  private sub: any;
  storeId: number;
  store: Store;
  oldStore: Store;
  storeDetails: StoreDetails;
  storeDataLoaded = false;
  storeItemsDataLoaded = false;
  paymentDataLoaded = false;
  itemsBoughtCols: any[] = [];
  paymentCols: any[] = [];
  storeTreeNodes: any;
  storeItemRef: any;
  allPayments: Payment[] = [];
  totalAmountPaid = 0;
  totalItemCostBought = 0;
  amountLeftToPay = 0;
  paymentRef: any;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private dialogService: DialogService,
    private messageService: MessageService
  ) {
    this.sub = this.route.params.subscribe(params => {
      this.storeId = +params['id']; // (+) converts string 'id' to a number
      this.getAllItemsBoughtByStore();
      this.getAllPaymentsDoneByStore();
      this.getAmountLeftToPay();
      this.getStore();
    });
  }

  ngOnInit(): void {
    this.itemsBoughtCols = [
      { field: 'name', header: 'Item' },
      { field: 'boughtCount', header: 'Bought Count' },
      { field: 'totalPrice', header: 'Total Price' }
    ];

    this.paymentCols = [
      { field: 'date', header: 'Date' },
      { field: 'amount', header: 'Amount Paid' },
    ];
  }

  getStore() {
    this.store = SharedService.store;
    this.oldStore = { ... this.store };
    if (!this.store) {
      this.getStoreById();
    } else {
      this.storeDataLoaded = true;
    }
  }

  getStoreById() {
    this.dataService.getStoreById(this.storeId).subscribe(data => {
      this.store = data;
      this.oldStore = { ... this.store };
      this.storeDataLoaded = true;
    });
  }

  getAllPaymentsDoneByStore() {
    this.dataService.getAllPaymentsDoneByStore(this.storeId).subscribe(data => {
      this.allPayments = data;
      this.totalAmountPaid = this.getTotalAmountPaid();
    });
  }

  getTotalAmountPaid(): number {
    if (this.allPayments.length) {
      return this.allPayments?.map(x => x.amount)?.reduce((a, c) => a + c);
    }
    return 0;
  }

  getAmountLeftToPay() {
    this.dataService.getLeftAmountToBePaidByStore(this.storeId).subscribe(data => {
      this.amountLeftToPay = data;
    });
  }

  getAllItemsBoughtByStore() {
    this.dataService.getAllItemsBoughtByStore(this.storeId).subscribe(data => {
      this.storeDetails = data;
      this.storeTreeNodes = this.convertToTreeNode();
      this.storeItemsDataLoaded = true;
    });
  }

  convertToTreeNode() {
    const treeNodes: any[] = [];
    this.storeDetails.dateStoreItemsData.forEach(element => {
      const temp = this.getTreeNode(element);
      treeNodes.push(temp);
    });
    return treeNodes;
  }

  getTreeNode(dateStoreItemsData: DateStoreItemsData) {
    const children = this.getChildrenNode(dateStoreItemsData.storeItems);
    const totalPrice = children.map(x => x.data).map(q => q.totalPrice).reduce((a, c) => a + c);
    this.totalItemCostBought += totalPrice;
    const boughtCount = children.map(x => x.data).map(q => q.boughtCount).reduce((a, c) => a + c);
    return {
      data: {
        name: dateStoreItemsData.date,
        totalPrice: totalPrice,
        boughtCount: boughtCount
      },
      children: children
    };
  }

  getChildrenNode(storeItemsDatas: StoreItemsData[]) {
    const treeNode: TreeNode[] = [];
    storeItemsDatas.forEach(element => {
      treeNode.push(this.getNode(element));
    });
    return treeNode;
  }

  getNode(storeItemsData: StoreItemsData): TreeNode {
    return {
      data: {
        name: storeItemsData.name,
        boughtCount: storeItemsData.boughtCount,
        sellingPrice: storeItemsData.sellingPrice,
        id: storeItemsData.id,
        itemId: storeItemsData.itemId,
        date: storeItemsData.date,
        totalPrice: storeItemsData.boughtCount * storeItemsData.sellingPrice
      }
    };
  }

  disableSave(): boolean {
    if (this.store) {
      if (!this.store.name || this.store.name === ''
        || !this.store.address || this.store.address === '') {
        return true;
      }
    }
    if (JSON.stringify(this.oldStore) === JSON.stringify(this.store)) {
      return true;
    }
    return false;
  }

  saveStore() {
    this.dataService.updateStore(this.store).subscribe(data => {
      this.router.navigate(['stores']);
    });
  }

  onAddStoreItem() {
    this.storeItemRef = this.dialogService.open(AddUpdateStoreItemsComponent, {
      header: 'Add Store Item',
      width: '680px',
      data: {
        storeId: this.storeId
      }
    });

    this.storeItemRef.onClose.subscribe((storeItem: StoreItem) => {
      if (storeItem && storeItem.date) {
        this.displayToaster(true);
        this.getAllItemsBoughtByStore();
      }
    });
  }

  onEditStoreItem(storeItem: any) {
    this.storeItemRef = this.dialogService.open(AddUpdateStoreItemsComponent, {
      header: 'Edit Store Item',
      width: '680px',
      data: {
        storeId: this.storeId,
        storeItem: storeItem
      }
    });

    this.storeItemRef.onClose.subscribe((updatedItem: Itenary) => {
      if (updatedItem && updatedItem.date) {
        this.displayToaster(true, true);
        this.getAllItemsBoughtByStore();
      }
    });
  }

  onAddPayment() {
    this.paymentRef = this.dialogService.open(AddUpdatePaymentComponent, {
      header: 'Add Payment',
      width: '680px',
      data: {
        storeId: this.storeId
      }
    });

    this.paymentRef.onClose.subscribe((payment: Payment) => {
      if (payment && payment.date) {
        this.displayToaster(false);
        this.getAllPaymentsDoneByStore();
        this.calculateNewAmountLeftToPay(payment);
      }
    });
  }

  onEditPayment(payment: Payment) {
    this.paymentRef = this.dialogService.open(AddUpdatePaymentComponent, {
      header: 'Edit Payment',
      width: '680px',
      data: {
        payment: payment,
        storeId: this.storeId
      }
    });

    this.paymentRef.onClose.subscribe((updatedPayment: Payment) => {
      if (updatedPayment && updatedPayment.date) {
        this.displayToaster(true);
        this.getAllPaymentsDoneByStore();
        this.getAmountLeftToPay();
      }
    });
  }

  calculateNewAmountLeftToPay(newPayment: Payment) {
    this.amountLeftToPay -= newPayment.amount;
  }

  displayToaster(isStoreToaster = false, isEdit = false) {
    this.messageService
      .add({
        severity: 'success',
        detail: isStoreToaster
          ? isEdit ? 'Store Item Added successfully' : 'Store Item Updated successfully'
          : isEdit ? 'Payment Added successfully' : 'Payment Updated successfully'
      });
  }
}
