import { Observable } from 'rxjs';

import { List } from '../models/list.model';
import { Site } from '../models/site.model';
import { View } from '../models/view.model';

export interface SharePointWebService {
    getSitesForUser(): Observable<Site[]>;
    getListsForSite(site: Site): Observable<List[]>;
    getViewsForList(list: List): Observable<View[]>;
    getListContent(list: List): Observable<Map<string, string>[]>;
    getViewContent(list: List, view: View): Observable<Map<string, string>[]>;
    createListEntry(entry: Map<string, string>): Observable<Map<string, string>>;
    updateListEntry(entry: Map<string, string>): Observable<Map<string, string>>;
}