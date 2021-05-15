import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ClipboardHelper } from '../lib/clipboard.helper';
import { FrontendService } from '../lib/frontend.service';

@Component({
  selector: 'spi-import-table',
  templateUrl: './import-table.component.html',
  styleUrls: ['./import-table.component.scss']
})
export class ImportTableComponent implements OnInit {
  selectedLine = -1;
  selectedCol = -1;
  get columns() {
    return this.fes.columns;
  }

  get columnsWithoutId() {
    return this.columns.filter(c => c.internalName.toLowerCase() !== 'id');
  }

  @HostListener('document:click', ['$event'])
  clickout(event: MouseEvent) {
    if(this.eRef.nativeElement.contains(event.target)) {
      this.setPasteIndex(-1, -1);
    } else {
      this.setPasteIndex(-1, -1);
    }
  }


  constructor(private fes: FrontendService, private eRef: ElementRef) { }

  ngOnInit(): void {
  }

  onPaste(colIndex: number, event: ClipboardEvent) {
    try {
      if (event.clipboardData) {
        const lines = ClipboardHelper.getTableContent(event.clipboardData);
        console.log(lines);
      } else {
        console.log(event);
      }
    } catch (error) {
      console.log(error);
    }
  }

  setPasteIndex(line: number, col: number, event?: MouseEvent) {
    this.selectedLine = line;
    this.selectedCol = col;
    if (event) {
      event.cancelBubble = true;
    }
  }

}