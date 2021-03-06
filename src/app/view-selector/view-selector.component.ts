import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FrontendService } from '../lib/frontend.service';
import { View } from '../lib/models/view.model';

@Component({
  selector: 'spi-view-selector',
  templateUrl: './view-selector.component.html',
  styleUrls: ['./view-selector.component.scss']
})
export class ViewSelectorComponent implements OnInit, OnDestroy {
  get selectedView() {
    return this.fes.selectedView.value;
  };
  set selectedView(value) {
    this.fes.selectedView.next(value);
  }
  get disableSelection() {
    return this.fes.clipBoardPasted;
  }
  availableViews: View[] = [];
  private subscription?: Subscription;

  constructor(private fes: FrontendService) {
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.fes.getViewsForList(this.fes.selectedList.value!).subscribe(views => {
      this.availableViews = views;
    });
  }

}
