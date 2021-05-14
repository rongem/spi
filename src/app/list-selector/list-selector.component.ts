import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { FrontendService } from '../lib/frontend.service';

import { List } from '../lib/models/list.model';
import { SharePointMockupSevice } from '../lib/spmockup.service';

@Component({
  selector: 'spi-list-selector',
  templateUrl: './list-selector.component.html',
  styleUrls: ['./list-selector.component.scss']
})
export class ListSelectorComponent implements OnInit {
  siteName = '';
  listEntry?: string;
  lists: List[] = [];
  siteFound = false;
  outputPresent = false;
  private internalSiteName = '';
  constructor(private spMockupService: SharePointMockupSevice, private fes: FrontendService) { }

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
    this.fes.selectedList.next(this.lists.find(l => l.id === this.listEntry))
    this.outputPresent = true;
  }

  unselect() {
    this.fes.selectedList.next(undefined);
    this.outputPresent = false;
  }

}
