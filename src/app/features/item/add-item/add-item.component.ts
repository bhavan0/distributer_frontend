import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Items } from 'src/app/shared/models/items.model';
import { DataService } from 'src/app/core/data-service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  item: Items;

  constructor(
    public ref: DynamicDialogRef,
    private dataService: DataService,
  ) {
    this.item = new Items();
  }

  ngOnInit(): void {
  }

  disableSave(): boolean {
    if (this.item) {
      if (!this.item.name || this.item.name === '') {
        return true;
      }
      if (!this.item.costPrice || !this.item.sellingPrice) {
        return true;
      }
    }
    return false;
  }

  closeDialogBox(item: Items = null) {
    this.ref.close(item);
  }

  saveItem() {
    this.dataService.addItem(this.item).subscribe(data => {
      this.closeDialogBox(this.item);
    });
  }
}
