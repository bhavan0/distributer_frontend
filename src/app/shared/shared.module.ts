import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MenubarModule } from 'primeng/menubar';
import { PageHeaderComponent } from './page-header/page-header.component';

@NgModule({
  declarations: [
    HeaderComponent,
    PageHeaderComponent
  ],
  imports: [
    CommonModule,
    MenubarModule
  ],
  exports: [
    HeaderComponent,
    PageHeaderComponent
  ]
})
export class SharedModule { }
