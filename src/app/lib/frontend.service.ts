import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { List } from './models/list.model';
import { View } from './models/view.model';

@Injectable({providedIn: 'root'})
export class FrontendService {
    selectedList = new BehaviorSubject<List | undefined>(undefined);
    selectedView = new BehaviorSubject<View | undefined>(undefined);

    constructor() {
        this.selectedList.subscribe(list => {
            this.selectedView.next(undefined);
        })
    }
}