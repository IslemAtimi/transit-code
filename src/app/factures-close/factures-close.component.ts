import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Router } from '@angular/router';
import { Timestamp } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-factures-close',
  templateUrl: './factures-close.component.html',
  styleUrls: ['./factures-close.component.scss']
})
export class FacturesCloseComponent implements OnInit {

  constructor(private route: Router,
private clientService: ClientService,
private datePipe: DatePipe
      ) { }

  clients: any[] = [];
  page:number=1
  total:number=0
  skip:number[]=[0]
  maxResultCount:number=3

  filterNumber?:string;
  filterDate?:string;
  filterFlag:boolean=false

  ngOnInit(): void {
    this.getClientsPaged(this.skip[0],this.maxResultCount)
    this.clientService.getCaisseData().then((data)=>{
      this.total=data.numberFacture
    })
  }
  

  getClientsPaged(skip:number,max:number){
    this.clientService.readClientsPaged(skip,max).then((data)=>{
      this.clients=data
      this.skip[this.page]=(parseInt(this.clients.pop()))
      
      this.clients.forEach((client)=>{
        client.dateCreation=this.formatDate(client.dateCreation)
      })
    })
  }

  goToFacture(id:string){
    this.route.navigate(['/facture-view',{ data: id }]);
  }

  deleteFacture(id:string,somme:number){
    this.clientService.deleteFacture(id,somme).then((data)=>{
      alert("la facture a ete supprimer avec succes")
      this.skip=[0];
      this.page=1;
      this.getClientsPaged(this.skip[this.page-1],this.maxResultCount)
      
    })
  }


nextStep(){
if(this.page*this.maxResultCount<this.total){this.page++
this.getClientsPaged(this.skip[this.page-1],this.maxResultCount)}

}

previousStep(){
  if(this.page>1){this.page--
    this.getClientsPaged(this.skip[this.page-1],this.maxResultCount)}
}

Reset(){
  this.filterFlag=false
  this.filterDate=undefined
  this.filterNumber=""
}
filter(){
this.filterFlag=true
this.clientService.readClientsPaged(0,50,this.filterNumber,this.filterDate).then((data)=>{
  this.clients=data
  this.clients.pop()//supprimer le dernier element car c lui de last id

  this.clients.forEach((client)=>{
    client.dateCreation=this.formatDate(client.dateCreation)
  })
})
}

formatDate(date: any): string {
  const dateObject = new Date(date.seconds * 1000);

  // Utilisez DatePipe pour formater la date
  const formattedDate = this.datePipe.transform(dateObject, 'dd-MM-yyyy');
  return formattedDate || '';
}

}

