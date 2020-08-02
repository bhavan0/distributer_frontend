import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng';
import { DataService } from 'src/app/core/data-service';
import { Payment } from 'src/app/shared/models/payment.model';
import moment from 'moment';

@Component({
  selector: 'app-add-update-payment',
  templateUrl: './add-update-payment.component.html',
  styleUrls: ['./add-update-payment.component.scss']
})
export class AddUpdatePaymentComponent implements OnInit {

  payment: Payment;
  storeId = 0;
  isEditCase = false;

  constructor(
    public ref: DynamicDialogRef,
    private dataService: DataService,
    private config: DynamicDialogConfig
  ) {
    if (this.config.data.storeId) {
      this.storeId = this.config.data.storeId;
    }
    if (this.config.data.payment) {
      this.payment = this.config.data.payment;
      this.payment.dateObject = new Date(this.payment.date);
      this.isEditCase = true;
    }
  }

  ngOnInit(): void {
    if (!this.isEditCase) {
      this.payment = new Payment();
    }
  }

  disableSave(): boolean {
    if (this.payment) {
      if (!this.storeId || !this.payment.amount) {
        return true;
      }
    }
    return false;
  }

  closeDialogBox(payment: Payment = null) {
    this.ref.close(payment);
  }

  savePayment() {
    this.payment.storeId = this.storeId;
    this.payment.date = moment(this.payment.dateObject).format('YYYY-MM-DD');

    if (this.isEditCase) {
      this.dataService.updatePayment(this.payment).subscribe(data => {
        this.closeDialogBox(this.payment);
      });
    } else {
      this.dataService.addPayment(this.payment).subscribe(data => {
        this.closeDialogBox(this.payment);
      });
    }
  }
}
