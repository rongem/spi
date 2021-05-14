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

  get columnsWithoutId() {
    return this.columns.filter(c => c.internalName.toLowerCase() !== 'id');
  }

  constructor(private fes: FrontendService) { }

  ngOnInit(): void {
  }

  onPaste(colIndex: number, event: ClipboardEvent) {
    console.log(colIndex, event);
  }

}
