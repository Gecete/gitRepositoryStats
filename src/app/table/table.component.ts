import { Component, Input } from '@angular/core';
import { AppComponent } from '../app.component';
import { SearchFilterPipe } from '../pipes/searchFilter';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent  {
  public searchInput:any = '';
  @Input('repos') repos: JSON;

  constructor() { }


}
