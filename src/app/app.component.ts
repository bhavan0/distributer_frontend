import { Component, OnInit } from '@angular/core';
import { DataService } from './core/data-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'distributer-frontend';

  constructor(private dataService: DataService) {

  }

  ngOnInit(): void {
    this.loadConfigurations();
  }

  loadConfigurations() {
    this.dataService.loadAssetConfigurations(environment.configurationPath);
  }
}
