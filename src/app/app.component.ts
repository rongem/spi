import { Component } from '@angular/core';
import { FrontendService } from './lib/frontend.service';
import { List } from './lib/models/list.model';

@Component({
  selector: 'spi-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Spi';

  constructor(private fes: FrontendService) {}

  get selectedList() {
    return this.fes.selectedList;
  }

  unselect() {
    this.fes.selectedList.next(undefined);
  }

}
