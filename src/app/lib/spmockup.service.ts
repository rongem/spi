import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { SharePointWebService } from './interfaces/spws.interface';
import { List } from './models/list.model';
import { Site } from './models/site.model';
import { View } from './models/view.model';

@Injectable({providedIn: 'root'})
export class SharePointMockupSevice implements SharePointWebService{
    getSitesForUser(): Observable<Site[]> {
        return of([
            new Site('1', 'one'),
            new Site('2', 'two'),
        ]);
    }
    getListsForSite(site: Site): Observable<List[]> {
        return of([
            new List('1', 'one'),
            new List('2', 'two'),
        ]);
    }
    getViewsForList(list: List): Observable<View[]> {
        return of([
            new View('1', 'one'),
            new View('2', 'two'),
        ]);
    }
    getListContent(list: List): Observable<Map<string, string>[]> {
        const map1 = new Map<string, string>();
        map1.set('id', '1');
        map1.set('a', 'one');
        map1.set('b', 'two');
        map1.set('c', 'three');
        const map2 = new Map<string, string>();
        map2.set('id', '2');
        map2.set('a', 'four');
        map2.set('b', 'five');
        map2.set('c', 'six');
        return of([map1, map2]);
    }
    getViewContent(list: List, view: View): Observable<Map<string, string>[]> {
        const map1 = new Map<string, string>();
        map1.set('id', '1');
        map1.set('a', 'one');
        map1.set('b', 'two');
        map1.set('c', 'three');
        const map2 = new Map<string, string>();
        map2.set('id', '2');
        map2.set('a', 'four');
        map2.set('b', 'five');
        map2.set('c', 'six');
        return of([map1, map2]);
    }
   createListEntry(entry: Map<string, string>): Observable<Map<string, string>> {
        return of(entry);
    }
    updateListEntry(entry: Map<string, string>): Observable<Map<string, string>> {
        return of(entry);
    }
}