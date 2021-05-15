import { Observable } from 'rxjs';

import { List } from '../models/list.model';
import { View } from '../models/view.model';

export interface SharePointWebService {
    // get a list of sites the user is responslble for (maybe impossible, so don't user until sure)
    getSitesForUser(): Observable<string[]>;

    // get all the lists (SharePoint Apps) the site contains, minus the system generated lists
    getListsForSite(site: string): Observable<List[]>;

    // get all non-grouped views
    getViewsForList(list: List): Observable<View[]>;

    // get all rows of the list
    getListContent(list: List): Observable<Map<string, string>[]>;

    // get filtered list content
    getViewContent(view: View): Observable<Map<string, string>[]>;

    // create a new row in a list
    createListEntry(list: List, entry: Map<string, string>): Observable<Map<string, string>>;

    // update an existing row in the list
    updateListEntry(list: List, entry: Map<string, string>): Observable<Map<string, string>>;
}