import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent implements OnInit {

  champsTitle:string[]=["Name","Date","Adresse","Tel/Fax","Declaration","RCN","NIF"]
  champsTitleValue:Record<string,string>={}

  champsClient:string[]=["Name","Adresse","FactureNumber","Origine","Nature de Marchandise","Nombre_Colis"]
  champsClientValue:Record<string,string>={}
  newChamp:string=""
  factureNumber:number=0

  champsFacture:string[]=[
    "Frais debarquement","Overture de dossier","Frais de suivi"	,
    "Surestaries",	
    "H.S  douane",
    "Complement visite",	
    "Complement Magasinage",
    "Pesage",
    "Institut pasteur",	
    "Recherche nucleaire",
    "Timbre",	
    "Facture Vide",	
    "Frais douanes",
    "Honoraires"	
    ]
  champsClientValueFacture:Record<string,number>={}
  newChampFacture:string=""

  width:string="w-2"
  color:string[]=["text-blue-600","","",""]
  step:number=0

  Total:number = 0
  NetPayer:number = 0

  constructor(private route: Router,
    private service:ClientService
  ) { }

  ngOnInit(): void {
    this.titleInit()

    this.champsClient.forEach((champ)=>{
      this.champsClientValue[champ]=""
    })

    this.champsFacture.forEach((champ)=>{
      this.champsClientValueFacture[champ]=0
    })
    
  }

  
 
  addChamp(): void {
    this.champsClient.push(this.newChamp)
    this.champsClientValue[this.newChamp]=""
    this.newChamp=""
  }
 
  addChampFacture(){
    this.champsFacture.push(this.newChamp)
    this.champsClientValueFacture[this.newChamp]=0
    this.newChamp=""
  }

  deleteChamp(champ:string,type:string): void {
if(type=='client'){
  this.champsClient.splice(this.champsClient.indexOf(champ),1)
  delete this.champsClientValue[champ]
}
else if(type=='title'){
  this.champsTitle.splice(this.champsTitle.indexOf(champ),1)
  delete this.champsTitleValue[champ]
}
else{
  this.champsFacture.splice(this.champsFacture.indexOf(champ),1)
  delete this.champsClientValueFacture[champ]
}


  }

  nextStep(){
    this.step++;
    switch (this.step) {
      case 0:
        this.width="w-2"
        this.color=["text-blue-600","","",""]
        
        break;
        case 1:
          this.width="w-1/3"
          this.color=["text-blue-600","text-blue-600","",""]
          break;
          case 2:
          if(this.checkFactureNumber()){
          this.width="w-2/3"
          this.color=["text-blue-600","text-blue-600","text-blue-600",""]
          }
        break;
        case 3:
          if(this.checkFactureChiffres())
          this.champsClientValue["FactureNumber"]=this.factureNumber+''
         { this.getTotal()
        this.width="w-full"
        this.color=["text-blue-600","text-blue-600","text-blue-600","text-blue-600"]}
        break;
      
    }
   
  }
  previousStep(){
    this.step--;
    switch (this.step) {
      case 0:
        this.width="w-2"
        this.color=["text-blue-600","","",""]
        break;
        case 1:
          this.width="w-1/3"
          this.color=["text-blue-600","text-blue-600","",""]
          break;
          case 2:
        this.width="w-2/3"
        this.color=["text-blue-600","text-blue-600","text-blue-600",""]
        break;
        case 3:
          
        this.width="w-full"
        this.color=["text-blue-600","text-blue-600","text-blue-600","text-blue-600"]
        break;
      
    }
  }

  titleInit(){
    this.service.getCaisseData().then((data)=>{
      this.champsTitleValue["Name"]="TRANSIT  FARID ABOUSSEDDIK"
      this.champsTitleValue["Date"]="ALGER LE  "+this.formatDate(new Date())
      this.champsTitleValue["Adresse"]="BT10 - N°01 Rue DU 24 FEVRIER Alger CENTRE"
      this.champsTitleValue["Tel/Fax"]="023 42 15 24"
      this.champsTitleValue["Declaration"]="6659 du 26/11/2023"
      this.champsTitleValue["RCN"]="23A5057013"
      this.champsTitleValue["NIF"]="16947040036019011600"
      this.factureNumber=(data.lastFactureId+1)//initialise par la valeur id correspandante

    })
    
  }

  stock(){
    this.champsClientValue["FactureNumber"]=this.factureNumber+''
    this.champsClientValue["NetPayer"]=this.NetPayer+''
    this.champsClientValue["selected"]='true'
    //to do sil existe une facture de meme id
    this.service.createClient(this.champsClientValue,this.champsClientValueFacture,this.champsTitleValue).then((data)=>{console.log(data)
      if(data==true){
        if (confirm("la facture a ete cree avec succes") == true) {
          this.route.navigate(['/facture-view',{ data: this.champsClientValue["FactureNumber"] }]);
        }
      }
      else{
        confirm("la facture na pas ete cree il peut quelle existe deja")
       
      }
    })
    }
    checkFactureChiffres():boolean{
      let result=true
      this.champsFacture.forEach((champ)=>{
         if(/^[0-9]+$/.test(this.champsClientValueFacture[champ].toString())===false)
         {alert("les entrees de la facture il faut quil soient des nombres")
        this.step--;
        result=false
      }})
    
      return result
    }
  
    checkFactureNumber():boolean{
     
      if(typeof(this.factureNumber)!="number"){
        alert("le nombre de facture il faut quil etre un nombre")
        this.step--;
        return false
      }
      return true
    }
  
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

  private formatDate(date: Date): string {
    const day: string = this.padZero(date.getDate());
    const month: string = this.padZero(date.getMonth() + 1); // Les mois sont indexés de 0 à 11
    const year: number = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  private padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}
