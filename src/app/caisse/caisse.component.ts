import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-caisse',
  templateUrl: './caisse.component.html',
  styleUrls: ['./caisse.component.scss']
})
export class CaisseComponent implements OnInit {
  constructor(
    private service:ClientService
  ) { }

  total:number=0
  nombreFacture:number=0
  nombreBons:number=0
  ngOnInit(): void {
    this.service.getCaisseData().then((data)=>{
      this.total=data.caisse
      this.nombreFacture=data.numberFacture
      this.nombreBons=data.numberBons
    })
  }

}
