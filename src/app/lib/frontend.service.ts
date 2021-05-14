import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SharePointWebService } from './interfaces/spws.interface';
import { List } from './models/list.model';
import { View } from './models/view.model';
import { SharePointMockupSevice } from './spmockup.service';

@Injectable({providedIn: 'root'})
export class FrontendService implements SharePointWebService {
    selectedList = new BehaviorSubject<List | undefined>(undefined);
    selectedView = new BehaviorSubject<View | undefined>(undefined);

    // Gibt alle Spalten der gewählten Ansicht zurück, andernfalls alle Spalten der Liste
    get columns() {
        if (this.selectedView.value) {
            return this.selectedView.value.columns;
        } else {
            return this.selectedList.value!.columns;
        }
    }

    // Hier den Klassennamen hinter sps ändern, um einen echten SharePoint-Konnektor anzuschließen
    constructor(private sps: SharePointMockupSevice) {
        this.selectedList.subscribe(list => {
            this.selectedView.next(undefined);
        })
    }

    // Kapselung der Methoden des SharePoint-Konnektors, um Änderungen nur an einer Stelle pflegen zu müssen
    getSitesForUser(): Observable<string[]> {
        return this.sps.getSitesForUser();
    }
    getListsForSite(site: string): Observable<List[]> {
        return this.sps.getListsForSite(site);
    }
    getViewsForList(list: List): Observable<View[]> {
        return this.sps.getViewsForList(list);
    }
    getListContent(list: List): Observable<Map<string, string>[]> {
        return this.sps.getListContent(list);
    }
    getViewContent(view: View): Observable<Map<string, string>[]> {
        return this.sps.getViewContent(view);
    }
    createListEntry(list: List, entry: Map<string, string>): Observable<Map<string, string>> {
        return this.sps.createListEntry(list, entry);
    }
    updateListEntry(list: List, entry: Map<string, string>): Observable<Map<string, string>> {
        return this.sps.updateListEntry(list, entry);
    }
}