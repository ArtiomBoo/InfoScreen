import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {NgOptimizedImage} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {VgPageComponent} from "./pages/vg/vgPage.component";
import {MainPageComponent} from "./pages/main/mainPage.component";
import {NrkPageComponent} from "./pages/nrk/nrkPage.component";
import {Kode24PageComponent} from "./pages/kode24/kode24Page.component";
import {NewsComponent} from "./components/news/news.component";
import {DallePageComponent} from "./pages/dalle/dallePage.component";
import {FunFactPageComponent} from "./pages/fun_fact/funFactPage.component";
import {DevFunFactPageComponent} from "./pages/dev_fun_fact/devFunFactPage.component";
import { HeaderComponent } from './components/header/header.component';

//Routes
const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  {path: "main", component: MainPageComponent},
  {path: "vg", component: VgPageComponent},
  {path: "nrk", component: NrkPageComponent},
  {path: "kode24", component: Kode24PageComponent},
  {path: "funfact", component: FunFactPageComponent},
  {path: "devfunfact", component: DevFunFactPageComponent},
  {path: "dalle", component: DallePageComponent} // http://localhost:4200/dalle?prompt=Christmas%20mood%20in%20norway&cache=false
]
@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    VgPageComponent,
    NrkPageComponent,
    Kode24PageComponent,
    NewsComponent,
    DallePageComponent,
    FunFactPageComponent,
    DevFunFactPageComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgOptimizedImage,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
