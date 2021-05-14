import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { SharePointWebService } from './interfaces/spws.interface';
import { Column } from './models/column.model';
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
        const columns = [
            new Column('0', 'id'),
            new Column('1', 'first'),
            new Column('2', 'second'),
            new Column('3', 'third'),
        ];
        return of([
            new List('1', 'one', site, columns),
            new List('2', 'two', site, columns),
        ]);
    }
    getViewsForList(list: List): Observable<View[]> {
        const columns = [
            new Column('2', 'second'),
            new Column('1', 'first'),
        ];
        return of([
            new View('1', 'one', list, columns),
            new View('2', 'two', list, columns),
        ]);
    }
    getListContent(list: List): Observable<Map<string, string>[]> {
        const map1 = new Map<string, string>();
        map1.set('id', '1');
        map1.set('first', 'one');
        map1.set('second', 'two');
        map1.set('third', 'three');
        const map2 = new Map<string, string>();
        map2.set('id', '2');
        map2.set('first', 'four');
        map2.set('second', 'five');
        map2.set('third', 'six');
        return of([map1, map2]);
    }
    getViewContent(view: View): Observable<Map<string, string>[]> {
        const map1 = new Map<string, string>();
        map1.set('id', '1');
        map1.set('first', 'one');
        map1.set('second', 'two');
        map1.set('third', 'three');
        const map2 = new Map<string, string>();
        map2.set('id', '2');
        map2.set('first', 'four');
        map2.set('second', 'five');
        map2.set('third', 'six');
        return of([map1, map2]);
    }
   createListEntry(list: List, entry: Map<string, string>): Observable<Map<string, string>> {
        return of(entry);
    }
    updateListEntry(list: List, entry: Map<string, string>): Observable<Map<string, string>> {
        return of(entry);
    }
}