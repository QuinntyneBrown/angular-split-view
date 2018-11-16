import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SashComponent } from './sash.component';
import { SplitViewComponent } from './split-view.component';

@NgModule({
  declarations: [
    AppComponent,
    SashComponent,
    SplitViewComponent
  ],
  imports: [
    BrowserModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
