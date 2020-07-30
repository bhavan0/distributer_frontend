import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/core/data-service';
import { Items } from 'src/app/shared/models/items.model';
import { Itenary } from 'src/app/shared/models/itenary.model';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit, OnDestroy {

  itemId: number;
  private sub: any;
  item: Items;
  itenary: Itenary[] = [];
  itemDataLoaded = false;
  itenaryDataLoaded = false;
  cols: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'date', header: 'Date' },
      { field: 'boughtCount', header: 'Bought Count' },
      { field: 'soldCount', header: 'Sold Count' }
    ];
    this.sub = this.route.params.subscribe(params => {
      this.itemId = +params['id']; // (+) converts string 'id' to a number
      this.getItemById();
      this.getItemItenary();
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getItemById() {
    this.dataService.getItemById(this.itemId).subscribe(data => {
      this.item = data;
      this.itemDataLoaded = true;
    });
  }

  getItemItenary() {
    this.dataService.getItemItenary(this.itemId).subscribe(data => {
      this.itenary = data;
      this.itenaryDataLoaded = true;
    });
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

  saveItem() {
    this.dataService.updateItem(this.item).subscribe(data => {
      this.router.navigate(['items']);
    });
  }
}
