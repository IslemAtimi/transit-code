import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bons-view',
  templateUrl: './bons-view.component.html',
  styleUrls: ['./bons-view.component.scss']
})
export class BonsViewComponent implements OnInit {
  champsTitleValue:Record<string,string>={}
  champTitle:string[]=[]
  champDate:string=""
  champs:string[]=[]
  total:number=0
  name:string=""
  champBonsQnt:Record<string,number>={}
  champBonsPrice:Record<string,number>={}
  id:string=""
  
  constructor(
    private route:ActivatedRoute,
    private service:ClientService
  ) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['data'];
    this.getTitleValue()
    this.getBon(this.id)
  }

  getTitleValue(){
    this.service.getTitleData("1").then((data)=>{
      this.extraireClesEtValeurs(data,"title")
    })
  }

  async getBon(id:string){
    await this.service.readBon(id).then((data)=>{
     this.extraireClesEtValeurs(data.bon.data,"bon")
     this.champDate=data.bon.date
     this.total=data.bon.total
     this.name=data.bon.name
    })
  }

  extraireClesEtValeurs(data:object,type:string): void {
    if(type=="title")
    {for (const [cle, valeur] of Object.entries(data)) {
      this.champTitle.push(cle)
      this.champsTitleValue[cle]=valeur
      
    }}
    else{
      for (const [cle, valeur] of Object.entries(data)) {
        this.champs.push(cle)
        this.champBonsPrice[cle]=valeur[1]
        this.champBonsQnt[cle]=valeur[0]
    }
  }
  }

  imprimer(){
    window.print();
  }

}
