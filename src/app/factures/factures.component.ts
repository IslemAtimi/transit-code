import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../services/client.service';
import { BehaviorSubject, from } from 'rxjs';
import { DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'app-factures',
  templateUrl: './factures.component.html',
  styleUrls: ['./factures.component.scss']
})
export class FacturesComponent implements OnInit {


  clients : Client[] =  []
  
  constructor(private route: Router, private client: ClientService) { }

  ngOnInit(): void {

  }

  goToFacture(){
    this.route.navigate(['/facture-view',{ data: "test" }]);
  }

}


// TODO update fields according to database 
interface Client {
  age: number;
  name: string;
  prenom: string;
}