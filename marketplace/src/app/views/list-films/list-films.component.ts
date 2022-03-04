import { Router } from '@angular/router';
import { Film } from './film.model';
import { CheckoutService } from './../checkout/checkout.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-films',
  templateUrl: './list-films.component.html',
  styleUrls: ['./list-films.component.css']
})
export class ListFilmsComponent implements OnInit {
  ListFilms: Film[] =[];
  listSelectedFilms!: number;
  hidden = false;


  constructor(private checkoutService:CheckoutService, private route: Router) { }

  //Inicializa a página
  ngOnInit(): void {
    this.checkoutService.totalPrice = 0;
    this.checkoutService.listSelectedFilms = [];
    this.checkoutService.getListFilms().subscribe((film)=>{
      this.ListFilms = film;
    })
  }
// Altera a qnt de itens no carrinho de compras
  toogleBadgeVisibility(){
    this.hidden = !this.hidden;
  }

  // Contador de itens do carrinho de compras
  toogleCount(){
    return this.listSelectedFilms = this.checkoutService.listSelectedFilms.length;

  }
//Vai para pagina de checkout
  toCheckout(): void{
this.route.navigate(['../checkout']);
  }

}
