import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { SharePointWebService } from './interfaces/spws.interface';
import { List } from './models/list.model';
import { View } from './models/view.model';

@Injectable({providedIn: 'root'})
export class SharePointMockupSevice implements SharePointWebService{
    getSitesForUser(): Observable<string[]> {
        return of([
            'site-one',
            'site-two',
        ]);
    }
    getListsForSite(site: string): Observable<List[]> {
        return of([
            new List('1', 'one', site),
            new List('2', 'two', site),
        ]);
    }
    getViewsForList(list: List): Observable<View[]> {
        return of([
            new View('1', 'one', list),
            new View('2', 'two', list),
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
    getViewContent(view: View): Observable<Map<string, string>[]> {
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