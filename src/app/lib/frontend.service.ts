import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SharePointWebService } from './interfaces/spws.interface';
import { List } from './models/list.model';
import { TransferError } from './models/transfer-error.model';
import { View } from './models/view.model';
import { SharePointMockupSevice } from './spmockup.service';

@Injectable({providedIn: 'root'})
export class FrontendService implements SharePointWebService {
    selectedList = new BehaviorSubject<List | undefined>(undefined);
    selectedView = new BehaviorSubject<View | undefined>(undefined);
    appBusy = false;
    error?: Error | TransferError;

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
    // und zusätzlich eine Top-Level-Fehlerbehandlung zu gewährleisten
    getSitesForUser(): Observable<string[]> {
        this.appBusy = true;
        return this.sps.getSitesForUser().pipe(
            tap(() => this.appBusy = false),
            catchError((error: Error) => {
                this.appBusy = false;
                this.error = error;
                return of([]);
            }),
        );
    }
    getListsForSite(site: string): Observable<List[]> {
        this.appBusy = true;
        return this.sps.getListsForSite(site).pipe(
            tap(() => this.appBusy = false),
            catchError((error: Error) => {
                this.appBusy = false;
                this.error = error;
                return of([]);
            }),
        );
    }
    getViewsForList(list: List): Observable<View[]> {
        this.appBusy = true;
        return this.sps.getViewsForList(list).pipe(
            tap(() => this.appBusy = false),
            catchError((error: Error) => {
                this.appBusy = false;
                this.error = error;
                return of([]);
            }),
        );
    }
    getListContent(list: List): Observable<Map<string, string>[]> {
        this.appBusy = true;
        return this.sps.getListContent(list).pipe(
            tap(() => this.appBusy = false),
            catchError((error: Error) => {
                this.appBusy = false;
                this.error = error;
                return of([]);
            }),
        );
    }
    getViewContent(view: View): Observable<Map<string, string>[]> {
        this.appBusy = true;
        return this.sps.getViewContent(view).pipe(
            tap(() => this.appBusy = false),
            catchError((error: Error) => {
                this.appBusy = false;
                this.error = error;
                return of([]);
            }),
        );
    }
    createListEntry(list: List, entry: Map<string, string>): Observable<Map<string, string>> {
        return this.sps.createListEntry(list, entry).pipe(
            catchError((error: Error) => {
                this.error = error;
                return of(new Map<string, string>());
            }),
        );
    }
    updateListEntry(list: List, entry: Map<string, string>): Observable<Map<string, string>> {
        return this.sps.updateListEntry(list, entry).pipe(
            catchError((error: Error) => {
                this.error = error;
                return of(new Map<string, string>());
            }),
        );
    }
}