import { Component } from '@angular/core';
import { List } from './lib/models/list.model';

@Component({
  selector: 'spi-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Spi';

  listSelected(event: List) {
    console.log(event);
  }
}
