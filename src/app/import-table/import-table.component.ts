import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ClipboardHelper } from '../lib/clipboard.helper';
import { FrontendService } from '../lib/frontend.service';
import { Row } from '../lib/models/row.model';

@Component({
  selector: 'spi-import-table',
  templateUrl: './import-table.component.html',
  styleUrls: ['./import-table.component.scss']
})
export class ImportTableComponent implements OnInit {
  selectedRow = -1;
  selectedCol = -1;
  rows: Row[] = []
  get columns() {
    return this.fes.columns;
  }

  get columnsWithoutId() {
    return this.columns.filter(c => c.internalName.toLowerCase() !== 'id');
  }

  get disableSelection() {
    return this.fes.clipBoardPasted;
  }

  constructor(private fes: FrontendService, private eRef: ElementRef) { }

  ngOnInit(): void {
  }

  onPaste(event: ClipboardEvent) {
    if (event.target instanceof HTMLTableCellElement) {
      const colIndex = event.target.cellIndex;
      const rowIndex = (event.target.parentElement as HTMLTableRowElement).rowIndex;
      try {
        if (event.clipboardData) {
          this.fes.appBusy = true;
          const lines = ClipboardHelper.getTableContent(event.clipboardData);
          // if selection is not in the utter left column, add empty fields
          // if array is larger than allowed, then cut it right
          for (let i = 0; i < lines.length; i++) {
            lines[i] = this.padLeftAndCutRight(lines[i], colIndex, this.columnsWithoutId.length);
          }
          this.createRows(lines);
          this.fes.clipBoardPasted = true;
        } else {
          console.log(event);
        }
      } catch (error) {
        this.fes.appBusy = false;
        console.log(error);
      }
    }
  }

  setPasteIndex(event: FocusEvent) {
    let colIndex = -1;
    let rowIndex = -1;
    if (event.type === 'focus' && event.target instanceof HTMLTableCellElement) {
      colIndex = event.target.cellIndex;
      rowIndex = (event.target.parentElement as HTMLTableRowElement).rowIndex;
    }
    this.selectedCol = colIndex;
    this.selectedRow = rowIndex;
  }

  private createRows(lines: string[][]) {
    lines.forEach(l => {
      this.rows.push(new Row(new Map<string, string>(l.map((c, index) => [this.columnsWithoutId[index].internalName, c]))));
    });
    this.importRows();
    this.fes.appBusy = false;
  }

  private async importRows() {
    for (let i = 0; i < this.rows.length; i++) {
      const row = this.rows[i];
      row.working = true;
      const result = await this.fes.createListEntry(this.fes.selectedList.value!, row.cells).toPromise();
      row.success = true;
      row.working = false;
      console.log(result);
    }
  }

  // if array is smaller than desired size, fill it to the right
  // if array is not supposed to start in the utter left cell, fill it from the left
  // if resulting array ist greater than allowed, cut it on the right
  private padLeftAndCutRight(arr: string[], numberToFill: number, maxLength: number = arr.length, fill: string = '') {
    if (arr.length + numberToFill < maxLength) {
      arr = arr.concat(Array<string>(maxLength - arr.length - numberToFill).fill(fill));
    }
    return Array<string>(numberToFill).fill(fill).concat(arr).slice(0, maxLength);
  }

}
