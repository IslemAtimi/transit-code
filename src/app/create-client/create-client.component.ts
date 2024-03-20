import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService , User} from '../services/client.service';
import { AddClientPopUpComponent } from '../add-client-pop-up/add-client-pop-up.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent implements OnInit{

  filterName:string=""
  filterNic=""
  filterFlag:boolean=false;
  clients: User[] = [];
  page:number=1;
  total:number=0
  skip:number[]=[0]
  maxResultCount:number=10
  constructor(private route: Router
    ,private clientService: ClientService,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.getUsers(this.skip[0],this.maxResultCount)
    this.clientService.getCaisseData().then((data)=>{
      this.total=data.numberClient
    })
  }

  filter(number?:string,name?:string){
    if(number=="")number=undefined
    if(name=="")name=undefined
    console.log(number,name)
    this.clientService.readUsersPaged(0,50,number,name).then((data)=>{
      this.skip[this.page]=(parseInt(data.pop()))
      this.clients=data
      
    })
  }
  Reset(){
    this.filterFlag=false
  this.filterName=""
  this.filterNic=""
}
  add(){
    this.openDialogPart();
  }
  goToClients(id:number){}
  deleteClients(id:number){

    if(confirm("voulez vous vraiment supprimer ce Client")){
      this.clientService.deleteUser(id).then((data)=>{
        alert("la facture a ete supprimer avec succes")
        this.skip=[0];
        this.page=1;
        this.getUsers(this.skip[this.page-1],this.maxResultCount)
        
      })
    }
  }


  getUsers(skip:number,max:number){
    this.clientService.readUsersPaged(skip,max).then((data)=>{
      this.skip[this.page]=(parseInt(data.pop()))
      this.clients=data
      
    })
  }

  nextStep(){
    if(this.page*this.maxResultCount<this.total){this.page++
    this.getUsers(this.skip[this.page-1],this.maxResultCount)}
    
    }
    
    previousStep(){
      if(this.page>1){this.page--
        this.getUsers(this.skip[this.page-1],this.maxResultCount)}
    }


  openDialogPart(): void {
    const dialogRef = this.dialog.open(AddClientPopUpComponent, {
      data: {
        data:this.clients
      },
      height: '50%',
      width: '50%',
       
    });
    dialogRef.afterClosed().subscribe(result => {
      //fonction appler
      this.clients.map(client=>{
          
      })
  
    });
  }
}
