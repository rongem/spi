import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

import { List } from '../lib/models/list.model';
import { SharePointMockupSevice } from '../lib/spmockup.service';

@Component({
  selector: 'spi-list-selector',
  templateUrl: './list-selector.component.html',
  styleUrls: ['./list-selector.component.scss']
})
export class ListSelectorComponent implements OnInit {
  @Output() selectedList: EventEmitter<List> = new EventEmitter();
  siteName = '';
  listEntry?: string;
  lists: List[] = [];
  siteFound = false;
  outputPresent = false;
  private internalSiteName = '';
  constructor(private spMockupService: SharePointMockupSevice) { }

  ngOnInit(): void {
  }

  getLists() {
    if (this.siteName.length > 0) {
      this.internalSiteName = this.siteName.trim();
      this.siteName = this.internalSiteName;
      this.spMockupService.getListsForSite(this.internalSiteName).pipe(
        take(1),
        catchError(() => {
          return of([]);
        })
      ).subscribe(list => {
        this.lists = list;
        this.siteFound = list.length > 0;
        this.listEntry = list.length ? this.lists[0].id : undefined;
      });
    }
  }

  submit() {
    this.selectedList.emit(this.lists.find(l => l.id === this.listEntry));
    this.outputPresent = true;
  }

  unselect() {
    this.selectedList.emit(undefined);
    this.outputPresent = false;
  }

}
