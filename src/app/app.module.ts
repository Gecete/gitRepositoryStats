import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { TableComponent } from './table/table.component';
import { SearchFilterPipe } from './pipes/searchFilter'
import { ArraySortPipe } from './pipes/sortPipe';
import { PieComponent } from './pie/pie.component'


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    SearchFilterPipe,
    ArraySortPipe,
    PieComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule    
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
