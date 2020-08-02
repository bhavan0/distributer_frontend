import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Item } from 'src/app/shared/models/item.model';
import { DataService } from 'src/app/core/data-service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  item: Item;

  constructor(
    public ref: DynamicDialogRef,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.item = new Item();
  }

  disableSave(): boolean {
    if (this.item) {
      if (!this.item.name || this.item.name === ''
        || !this.item.costPrice || !this.item.sellingPrice) {
        return true;
      }
    }
    return false;
  }

  closeDialogBox(item: Item = null) {
    this.ref.close(item);
  }

  saveItem() {
    this.dataService.addItem(this.item).subscribe(data => {
      this.closeDialogBox(this.item);
    });
  }
}
