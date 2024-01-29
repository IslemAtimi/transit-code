import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

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
  maxResultCount:number=10

  filterNumber?:string;
  filterDate?:string;
  filterFlag:boolean=false

constructor(private route: Router
  ,private datePipe: DatePipe,
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
    this.Bons.forEach((bon)=>{
      bon.date=this.formatDate(bon.date)
    })
    
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

filter(){
  this.filterFlag=true
  this.service.readBonsPaged(0,50,this.filterNumber,this.filterDate).then((data)=>{
    this.Bons=data
    this.Bons.forEach((bon)=>{
      bon.date=new Date(bon.date.seconds*1000)
    })
  })
  
  
  }
Reset(){
    this.filterFlag=false
  this.filterDate=undefined
  this.filterNumber=""
}


nextStep(){
  if(this.page*this.maxResultCount<this.total){this.page++
  this.getBons(this.skip[this.page-1],this.maxResultCount)}
  
  }
  
  previousStep(){
    if(this.page>1){this.page--
      this.getBons(this.skip[this.page-1],this.maxResultCount)}
  }

  formatDate(date: any): string {
    const dateObject = new Date(date.seconds * 1000);

    // Utilisez DatePipe pour formater la date
    const formattedDate = this.datePipe.transform(dateObject, 'dd-MM-yyyy');
    console.log(formattedDate)
    return formattedDate || '';
  }
}


