import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bons-list',
  templateUrl: './bons-list.component.html',
  styleUrls: ['./bons-list.component.scss']
})
export class BonsListComponent implements OnInit {

  Bons:any[] = [];
  page:number=1
  total:number=0
  skip:number[]=[0]
  maxResultCount:number=1

constructor(private route: Router,
  private service:ClientService) { }
  ngOnInit(): void {
    this.getBons(this.skip[0],this.maxResultCount)
    this.service.getCaisseData().then((data)=>{
      this.total=data.numberBons
    })
  }


getBons(skip:number,max:number){
  this.service.readBonsPaged(skip,max).then((data)=>{
    this.skip[this.page]=(parseInt(data.pop()))
    this.Bons=data
    
  })
}
  
 

deleteBons(id:string,somme:number) {
  
  this.service.deleteBon(id,somme).then((data)=>{
    confirm("le Bons est bien supprimer")
    this.skip=[0];
    this.page=1;
    this.getBons(this.skip[this.page-1],this.maxResultCount)
  }).catch((error)=>{
    console.log(error)
  })
}
goToBons(id:string) {
  this.route.navigate(['/bon-view',{ data: id }]);
}


nextStep(){
  if(this.page*this.maxResultCount<this.total){this.page++
  this.getBons(this.skip[this.page-1],this.maxResultCount)}
  
  }
  
  previousStep(){
    if(this.page>1){this.page--
      this.getBons(this.skip[this.page-1],this.maxResultCount)}
  }
}


