import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng';
import { DataService } from 'src/app/core/data-service';
import { Store } from 'src/app/shared/models/store.model';

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.scss']
})
export class AddStoreComponent implements OnInit {

  store: Store;

  constructor(
    public ref: DynamicDialogRef,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.store = new Store();
  }

  disableSave(): boolean {
    if (this.store) {
      if (!this.store.name || this.store.name === ''
        || !this.store.address || this.store.address === '') {
        return true;
      }
    }
    return false;
  }

  closeDialogBox(store: Store = null) {
    this.ref.close(store);
  }

  saveStore() {
    this.dataService.addStore(this.store).subscribe(data => {
      this.closeDialogBox(this.store);
    });
  }

}
