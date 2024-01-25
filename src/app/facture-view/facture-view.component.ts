import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-facture-view',
  templateUrl: './facture-view.component.html',
  styleUrls: ['./facture-view.component.scss']
})
export class FactureViewComponent implements OnInit {

  champsTitleValue:Record<string,string>={}
champsClientValue:Record<string,string>={}
champsClientValueFacture:Record<string,string>={}
champsClient:string[]=[]
  champsFacture:string[]=[]
  constructor(
    private route:ActivatedRoute,
    private client:ClientService
  ) { }

  ngOnInit(): void {
    var id = this.route.snapshot.params['data'];
    this.getFacture(id)
  }
async getFacture(id:string){
  await this.client.readClient(id).then((data)=>{
    this.extraireClesEtValeurs(data.client,"client")
    this.extraireClesEtValeurs(data.facture,"facture")
    this.extraireClesEtValeurs(data.entete,"entete")
    this.getTotal()
  })
}
  imprimer(){
    
    window.print();
  }


   listeTriees(champ:string[]): string[] {
    return champ.slice().sort((a, b) => a.localeCompare(b));
  }

  extraireClesEtValeurs(data:object,type:string): void {
    if(type=="client"){
    for (const [cle, valeur] of Object.entries(data)) {
      this.champsClient.push(cle)
      this.champsClientValue[cle]=valeur
    }
  }
  if(type=="facture"){
    for (const [cle, valeur] of Object.entries(data)) {
      this.champsFacture.push(cle)
      this.champsClientValueFacture[cle]=valeur
    }
  }
  else{
    for (const [cle, valeur] of Object.entries(data)) {
      this.champsTitleValue[cle]=valeur
    }
  }
  }

  Total:number=0
  NetPayer:number=0
  getTotal(){

    this.Total=this.sommeRecord(this.champsClientValueFacture)
    this.NetPayer=this.Total
    
  }

 
  sommeRecord(tab:any):number{
    let total=0;
    for (const [cle, valeur] of Object.entries(tab)) {
      total+=parseInt(valeur as string)
    }
    return total
  }


}
