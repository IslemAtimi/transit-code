import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import {  HttpClientModule } from '@angular/common/http'
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms'; // Importez le module FormsModule


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderSearchComponent } from './header-search/header-search.component';
import { HomeComponent } from './home/home.component';
import { FactureViewComponent } from './facture-view/facture-view.component';
import { FacturesComponent } from './factures/factures.component';
import { FacturesCloseComponent } from './factures-close/factures-close.component';
// Import the fire base
import { initializeApp, getApp,provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { firebaseConfig } from 'src/environments/environment';
import { CreateFactureComponent } from './create-facture/create-client.component';
import { CaisseComponent } from './caisse/caisse.component';
import { BonsComponent } from './bons/bons.component';
import { BonsListComponent } from './bons-list/bons-list.component';
import { BonsViewComponent } from './bons-view/bons-view.component';
import { DatePipe } from '@angular/common';
import { CreateClientComponent } from './create-client/create-client.component';
import { AddClientPopUpComponent } from './add-client-pop-up/add-client-pop-up.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { AngularFireModule } from '@angular/fire';
// import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HeaderSearchComponent,
    HomeComponent,
    FactureViewComponent,
    FacturesComponent,
    FacturesCloseComponent,
    CreateFactureComponent,
    CaisseComponent,
    BonsComponent,
    BonsListComponent,
    BonsViewComponent,
    CreateClientComponent,
    AddClientPopUpComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatIconModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFirestoreModule,
    
    
  

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
