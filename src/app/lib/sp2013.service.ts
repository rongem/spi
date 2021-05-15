import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SharePointWebService } from './interfaces/spws.interface';
import { List } from './models/list.model';
import { View } from './models/view.model';

// SharePoint-Konnektor für SharePoint Version 2013
@Injectable({providedIn: 'root'})
export class SharePoint2013Service implements SharePointWebService {
    getSitesForUser(): Observable<string[]> {
        // Optional: Gibt eine Liste der Sites zurück, auf die der Benutzer Zugriff hat.
        // Möglicherweise benötigt diese Funktion zusätzlichen Code auf der Serverseite, so dass diese
        // Funktion nicht benutzt werden sollte, bevor das ausgetestet wurde. Falls es nicht geht,
        // einfach löschen.
        throw new Error('Method not implemented.');
    }
    getListsForSite(site: string): Observable<List[]> {
        // Gibt eine Liste von SharePoint-Apps (Listen und Dokumentenbibliotheken) zurück
        // Aus der Liste sollten die Standardnamen der von SharePoint intern benötigten Apps entfernt sein
        // Jede Liste enthält den Site-Namen, damit man ihn nicht als Extra-Parameter mit übergeben muss.
        // Zudem sollte ein Fehler geworfen werden, wenn die übergebene Site nicht existiert bzw. zugreifbar ist.
        // Die Spaltendefinitionen sollten so viele Daten wie möglich enthalten, ggf. die column.model.ts anpassen,
        // um Informationen zum Datentyp oder zu Validierungsregeln mit unterzubringen.
        // Achtung: System-Listen sollten herausgefiltet werden.
        throw new Error('Method not implemented.');
    }
    getViewsForList(list: List): Observable<View[]> {
        // Gibt eine Liste von Ansichten zurück, die zu der gegebenen Liste gehören.
        // Ansichten haben einen Namen, die zugehörige Liste und die Spaltendefinitionen und eine ggf. von der Liste
        // abweichend Spaltenauswahl und -reihenfolge, daher sollten hier die Spalten ebenfalls angezeigt werden.
        // Prinzipiell glaube ich, dass gruppierte Ansichten nicht zum Import geeignet sind, und ggf. herausgefiltert werden sollten.
        throw new Error('Method not implemented.');
    }
    getListContent(list: List): Observable<Map<string, string>[]> {
        // Gibt alle Zeilen einer Liste ungefiltert als Array zurück. Dabei stellt die Map sicher, dass die Felder nicht alphabetisch,
        // sondern nach Reihenfolge sortiert bleiben.
        throw new Error('Method not implemented.');
    }
    getViewContent(view: View): Observable<Map<string, string>[]> {
        // Gibt alle Zeilen einer Ansicht als Array zurück. Dabei stellt die Map sicher, dass die Felder nicht alphabetisch,
        // sondern nach Reihenfolge sortiert bleiben.
        // Die Ansicht kann Filter besitzen, so dass nicht alle Zeilen angezeigt werden.
        // Zudem kann eine Ansicht nach Spalten gruppieren. Hier weiß ich noch nicht, wie wir das abbilden sollen.
        // Ich brauche daher Informationen über die zurückgegebenen Daten.
        throw new Error('Method not implemented.');
    }
    createListEntry(list: List, entry: Map<string, string>): Observable<Map<string, string>> {
        // Erzeugt einen neuen Eintrag in einer App-Liste. Die Anzeigenamen der Spalten sind dabei als key in der Map gegeben,
        // der zugehörige Wert ist als String enthalten.
        // Rückgabe des erzeugten Eintrags erfolgt ebenfalls als Map, so dass auf der Client-Seite ein Vergleich möglich ist und
        // Abweichungen erkannt werden. Sollte einen Error werfen, wenn das Update fehlgeschlagen ist, möglichst mit detaillierten
        // Informationen zu den aufgetretenen Fehlern und den betroffenen Spalten. Ggf. brauchen wir dafür ein eigenes Error-Objekt.
        throw new Error('Method not implemented.');
    }
    updateListEntry(list: List, entry: Map<string, string>): Observable<Map<string, string>> {
        // Aktualisiert einen Eintrag in der einer App-Liste. Die Feldnamen sind dabei als key in der Map gegeben, der zugehörige Wert
        // als String enthalten. Derzeit nur Zukunftsmusik, zuerst muss das Erzeugen funktionieren.
        // Rückgabe der aktualisierten Map, so dass ein Vergleich möglich ist und Abweichungen erkannt werden.
        // Sollte einen Error auslösen, wenn das Update fehlgeschlagen ist, möglichst mit detaillierten
        // Informationen zu den aufgetretenen Fehlern und den betroffenen Spalten. Ggf. brauchen wir dafür ein eigenes Error-Objekt.
        throw new Error('Method not implemented.');
    }
}