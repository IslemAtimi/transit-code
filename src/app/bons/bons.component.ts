import { Component } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bons',
  templateUrl: './bons.component.html',
  styleUrls: ['./bons.component.scss']
})
export class BonsComponent {
constructor(private service:ClientService,private route:Router) { }

  champs:string[]=[]
  champBonsPrice:Record<string,number|undefined>={}
  champBonsQnt:Record<string,number|undefined>={}

  champsTitleValue:Record<string,string>={}
  champTitle:string[]=[]
  
  step:number=0
  newChamp:string=""
  total:number=0
  name:string=""

  champDate?:Date;

  addChamp(){
this.champs.push(this.newChamp)
this.champBonsPrice[this.newChamp]
this.champBonsQnt[this.newChamp]
this.newChamp=""
  }

  previousStep(){
    this.step--
  }

  nextStep(){
    console.log(this.champDate)
    if(this.checkFactureChiffres()){
    this.step++
    if(this.step==1){
      this.service.getTitleData("1").then((data)=>{
        this.extraireClesEtValeurs(data)
      })
      this.getTotal()
    }
  }
}
  
  stock(){
    var objectData:Record<string,number[]>={}
    this.champs.forEach((champ)=>{
      objectData[champ]=[this.champBonsQnt[champ]||0,this.champBonsPrice[champ]||0]
    })
    var objectSend={
      date:this.champDate,
      name:this.name,
      data:objectData,
      total:this.total,
      selected:true
    }
    this.service.createBons(objectSend).then((data)=>{
      confirm("la facture a ete cree avec succes")
      this.route.navigate(['/bonsList'])
    }).catch((error)=>{
      confirm("la facture na pas ete cree il peut quelle existe deja")
    })
  }


  extraireClesEtValeurs(data:object): void {
    
    for (const [cle, valeur] of Object.entries(data)) {
      this.champTitle.push(cle)
      this.champsTitleValue[cle]=valeur
    }
  }

  getTotal(){
    this.total=0
    for (const [cle, valeur] of Object.entries(this.champBonsPrice)) {
      this.total+=(valeur||0)*(this.champBonsQnt[cle]||1)
    }
  }

  checkFactureChiffres():boolean{
    let result=true
    if(this.champDate==undefined)return false
    for(const champ of this.champs){
       if((/^[0-9]+$/.test((this.champBonsPrice[champ]||0).toString())===false)||(/^[0-9]+$/.test((this.champBonsQnt[champ]||1).toString())===false))
        {alert("les entrees de la facture il faut quil soient des nombres numeriques")
        result=false;
        break;
    }}
  
    return result
  }

}
