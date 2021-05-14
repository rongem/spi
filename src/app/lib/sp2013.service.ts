import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SharePointWebService } from './interfaces/spws.interface';
import { List } from './models/list.model';
import { View } from './models/view.model';

// SharePoint-Konnektor für SharePoint Version 2013
@Injectable({providedIn: 'root'})
export class SharePoint2013Service implements SharePointWebService {
    getSitesForUser(): Observable<string[]> {
        throw new Error('Method not implemented.');
    }
    getListsForSite(site: string): Observable<List[]> {
        throw new Error('Method not implemented.');
    }
    getViewsForList(list: List): Observable<View[]> {
        throw new Error('Method not implemented.');
    }
    getListContent(list: List): Observable<Map<string, string>[]> {
        throw new Error('Method not implemented.');
    }
    getViewContent(view: View): Observable<Map<string, string>[]> {
        throw new Error('Method not implemented.');
    }
    createListEntry(list: List, entry: Map<string, string>): Observable<Map<string, string>> {
        throw new Error('Method not implemented.');
    }
    updateListEntry(list: List, entry: Map<string, string>): Observable<Map<string, string>> {
        throw new Error('Method not implemented.');
    }
}