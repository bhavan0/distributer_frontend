import { Component, OnInit } from '@angular/core';
import { Itenary } from 'src/app/shared/models/itenary.model';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng';
import { DataService } from 'src/app/core/data-service';
import moment from 'moment';

@Component({
  selector: 'app-add-update-itenary',
  templateUrl: './add-update-itenary.component.html',
  styleUrls: ['./add-update-itenary.component.scss']
})
export class AddUpdateItenaryComponent implements OnInit {

  itenary: Itenary;
  itemId = 0;
  isEditCase = false;

  constructor(
    public ref: DynamicDialogRef,
    private dataService: DataService,
    private config: DynamicDialogConfig
  ) {
    if (this.config.data.itemId) {
      this.itemId = this.config.data.itemId;
    }
    if (this.config.data.itenary) {
      this.itenary = this.config.data.itenary;
      this.itenary.dateObject = new Date(this.itenary.date);
      this.isEditCase = true;
    }
  }

  ngOnInit(): void {
    if (!this.isEditCase) {
      this.itenary = new Itenary();
    }
  }

  disableSave(): boolean {
    if (this.itenary) {
      if (!this.itemId || !this.itenary.boughtCount) {
        return true;
      }
    }
    return false;
  }

  closeDialogBox(itenary: Itenary = null) {
    this.ref.close(itenary);
  }

  saveItenary() {
    this.itenary.itemId = this.itemId;
    this.itenary.date = moment(this.itenary.dateObject).format('YYYY-MM-DD');

    if (this.isEditCase) {
      this.dataService.updateItenary(this.itenary).subscribe(data => {
        this.closeDialogBox(this.itenary);
      });
    } else {
      this.dataService.addItenary(this.itenary).subscribe(data => {
        this.closeDialogBox(this.itenary);
      });
    }
  }
}
