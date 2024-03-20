import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.scss']
})
export class HeaderSearchComponent implements OnInit {
  desktopMenuOpen: boolean=false;
  

  constructor(private route: Router) { }

  ngOnInit(): void {
  }
  mobile(){
    this.desktopMenuOpen= this.desktopMenuOpen?false:true
  }
    goToFactures(){
      this.route.navigate(['/facture-close']);
    }
    goToBons(){
      this.route.navigate(['/bonsList']);
    }

}
