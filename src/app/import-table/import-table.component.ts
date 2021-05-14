import { Component, OnInit } from '@angular/core';
import { FrontendService } from '../lib/frontend.service';

@Component({
  selector: 'spi-import-table',
  templateUrl: './import-table.component.html',
  styleUrls: ['./import-table.component.scss']
})
export class ImportTableComponent implements OnInit {
  get columns() {
    return this.fes.columns;
  }

  constructor(private fes: FrontendService) { }

  ngOnInit(): void {
  }

}
