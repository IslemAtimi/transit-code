import { Component, Inject, OnInit } from '@angular/core';
import { ClientService, User } from '../services/client.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-client-pop-up',
  templateUrl: './add-client-pop-up.component.html',
  styleUrls: ['./add-client-pop-up.component.scss'],
  animations: [],
})
export class AddClientPopUpComponent implements OnInit{

  constructor(private clientService:ClientService,
    @Inject(MAT_DIALOG_DATA) public clients:any,
  public dialogRef: MatDialogRef<AddClientPopUpComponent>,) { }


  champsClient:string[]=["Name","Adresse","NIC","Nature de Marchandise"]
  champsClientValue:Record<string,string>={}
  id:number=0

  ngOnInit(): void {
    
    this.champsClient.forEach((champ)=>{
      this.champsClientValue[champ]=""
    })
    this.clientService.getCaisseData().then((data)=>{
      this.id=data.lastClientId+1;
    })
    
  }

  Create(){
    const client:User={
      id: this.id,
      Name: this.champsClientValue["Name"],
      Adresse: this.champsClientValue["Adresse"],
      NIC: this.champsClientValue["NIC"],
      Nature_de_Marchandise: this.champsClientValue["Nature de Marchandise"]
    }
    this.clientService.createUser(client).then(()=>{
      alert("client ajouter avec succes")
      this.dialogRef.close();
    }).catch((error)=>{
      alert("le client na pas ete ajouter il peut quelle existe deja")
    })
    
  }
  deleteChamp(id:string){
    this.champsClient.splice(this.champsClient.indexOf(id),1)
    delete this.champsClientValue[id]
  }
  Close(){
    this.dialogRef.close();
  }
  

}
