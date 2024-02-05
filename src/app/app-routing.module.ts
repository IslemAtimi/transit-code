import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FacturesComponent } from './factures/factures.component';
import { FactureViewComponent } from './facture-view/facture-view.component';
import { FacturesCloseComponent } from './factures-close/factures-close.component';
import { CreateFactureComponent } from './create-facture/create-client.component';
import { CaisseComponent } from './caisse/caisse.component';
import { BonsComponent } from './bons/bons.component';
import { BonsListComponent } from './bons-list/bons-list.component';
import { BonsViewComponent } from './bons-view/bons-view.component';
import { CreateClientComponent } from './create-client/create-client.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',component: HomeComponent},
  { path: 'factures',component: FacturesComponent},
  { path: 'facture-view',component: FactureViewComponent},
  { path: 'facture-close',component: FacturesCloseComponent},
  { path: 'facture-create',component: CreateFactureComponent},
  { path: 'caisse',component: CaisseComponent},
  { path: 'bons',component: BonsComponent},
  { path: 'bonsList',component: BonsListComponent},
  { path: 'bon-view',component: BonsViewComponent},
  { path: 'clients',component: CreateClientComponent},
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
