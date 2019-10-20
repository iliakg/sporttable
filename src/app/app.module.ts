import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {OrderModule} from 'ngx-order-pipe'

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {TableCellComponent} from './table-cell.component'

@NgModule({
  declarations: [
    AppComponent,
    TableCellComponent
  ],
  imports: [BrowserModule, AppRoutingModule, OrderModule],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
