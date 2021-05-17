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

  @HostListener('document:click', ['$event']) clickOutside(event: MouseEvent) {
    // If the user clicks outside a td element, the selection is canceled.
    // Inside the td element the bubble is cancelled, so this function will never be called then
    this.selectedRow = -1;
    this.selectedCol = -1;
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
          const lines = ClipboardHelper.getTableContent(event.clipboardData);
          // if selection is not in the utter left column, add empty fields
          // if array is larger than allowed, then cut it right
          for (let i = 0; i < lines.length; i++) {
            lines[i] = this.padLeftAndCutRight(lines[i], colIndex, this.columnsWithoutId.length);
          }
          this.importRows(lines);
        } else {
          console.log(event);
        }
      } catch (error) {
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

  importRows(lines: string[][]) {
    lines.forEach(l => {
      this.rows.push(new Row(new Map<string, string>(l.map((c, index) => [this.columnsWithoutId[index].internalName, c]))));
    });
  }

  cancelBubble(event: Event) {
    event.cancelBubble = true;
  }

  padLeftAndCutRight(arr: string[], numberToFill: number, maxLength: number = arr.length, fill: string = '') {
    return Array<string>(numberToFill).fill(fill).concat(arr).slice(0, maxLength);
  }

}
