import { Observable } from 'rxjs';

import { List } from '../models/list.model';
import { View } from '../models/view.model';

export interface SharePointWebService {
    // Optional: Gibt eine Liste der Sites zurück, auf die der Benutzer Zugriff hat.
    // Möglicherweise benötigt diese Funktion zusätzlichen Code auf der Serverseite, so dass diese
    // Funktion nicht benutzt werden sollte, bevor das ausgetestet wurde
    getSitesForUser(): Observable<string[]>;

    // Gibt eine Liste von SharePoint-Apps (Listen und Dokumentenbibliotheken) zurück
    // Aus der Liste sollten die Standardnamen der von SharePoint intern benötigten Apps entfernt sein
    // Jede Liste enthält den Site-Namen, damit man ihn nicht als Extra-Parameter mit übergeben muss
    getListsForSite(site: string): Observable<List[]>;

    // Gibt eine Liste von Ansichten zurück, die zu der gegebenen Liste gehören
    // Ansichten haben einen Namen, die zugehörige Liste und die Spaltendefinitionen und deren Reihenfolge
    getViewsForList(list: List): Observable<View[]>;

    // Gibt alle Zeilen einer App als Array zurück. Dabei stellt die Map sicher, dass die Felder nicht alphabetisch,
    // sondern nach Reihenfolge sortiert bleiben.
    getListContent(list: List): Observable<Map<string, string>[]>;

    // Gibt alle Zeilen einer Ansicht als Array zurück. Dabei stellt die Map sicher, dass die Felder nicht alphabetisch,
    // sondern nach Reihenfolge sortiert bleiben.
    getViewContent(view: View): Observable<Map<string, string>[]>;

    // Erzeugt einen neuen Eintrag in einer App-Liste. Die Feldnamen sind dabei als key in der Map gegeben, der zugehörige Wert
    // als String enthalten.
    // Rückgabe des erzeugten Eintrags als Map, so dass ein Vergleich möglich ist und Abweichungen erkannt werden.
    // Sollte eine TransferException auslösen, wenn das Update fehlgeschlagen ist.
    createListEntry(entry: Map<string, string>): Observable<Map<string, string>>;

    // Aktualisiert einen Eintrag in der einer App-Liste. Die Feldnamen sind dabei als key in der Map gegeben, der zugehörige Wert
    // als String enthalten.
    // Rückgabe der aktualisierten Map, so dass ein Vergleich möglich ist und Abweichungen erkannt werden.
    // Sollte eine TransferException auslösen, wenn das Update fehlgeschlagen ist.
    updateListEntry(entry: Map<string, string>): Observable<Map<string, string>>;
}