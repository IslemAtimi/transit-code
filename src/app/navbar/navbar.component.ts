import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private route: Router
  ) { }
  desktopMenuOpen:boolean=false
  ngOnInit(): void {

  }
mobile(){
  this.desktopMenuOpen= this.desktopMenuOpen?false:true
}
  goToFactures(){
    this.desktopMenuOpen=false
    this.route.navigate(['/facture-close']);
  }
  goToBons(){
    this.desktopMenuOpen=false
    this.route.navigate(['/bonsList']);
  }
}
