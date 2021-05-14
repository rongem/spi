import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthInterceptor } from './lib/auth.interceptor';
import { ListSelectorComponent } from './list-selector/list-selector.component';
import { ViewSelectorComponent } from './view-selector/view-selector.component';
import { ImportTableComponent } from './import-table/import-table.component';

@NgModule({
  declarations: [
    AppComponent,
    ListSelectorComponent,
    ViewSelectorComponent,
    ImportTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
