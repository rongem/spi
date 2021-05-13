import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SharePointWebService } from './interfaces/spws.interface';
import { List } from './models/list.model';
import { Site } from './models/site.model';
import { View } from './models/view.model';

@Injectable({providedIn: 'root'})
export class SharePoint2013Service implements SharePointWebService {
    getSitesForUser(): Observable<Site[]> {
        throw new Error('Method not implemented.');
    }
    getListsForSite(site: Site): Observable<List[]> {
        throw new Error('Method not implemented.');
    }
    getViewsForList(list: List): Observable<View[]> {
        throw new Error('Method not implemented.');
    }
    getListContent(list: List): Observable<Map<string, string>[]> {
        throw new Error('Method not implemented.');
    }
    getViewContent(list: List, view: View): Observable<Map<string, string>[]> {
        throw new Error('Method not implemented.');
    }
    createListEntry(entry: Map<string, string>): Observable<Map<string, string>> {
        throw new Error('Method not implemented.');
    }
    updateListEntry(entry: Map<string, string>): Observable<Map<string, string>> {
        throw new Error('Method not implemented.');
    }
}