import { Component, OnInit } from '@angular/core';
import { Items } from 'src/app/shared/models/items.model';
import { DataService } from 'src/app/core/data-service';

@Component({
  selector: 'app-items-home',
  templateUrl: './items-home.component.html',
  styleUrls: ['./items-home.component.css']
})
export class ItemsHomeComponent implements OnInit {

  cols: any[] = [];
  items: Items[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'costPrice', header: 'Cost Price' },
      { field: 'sellingPrice', header: 'Selling Price' }
    ];
    this.getAllItems();
  }

  getAllItems() {
    this.dataService.getAllItems().subscribe(data => {
      this.items = data;
    });
  }

}
