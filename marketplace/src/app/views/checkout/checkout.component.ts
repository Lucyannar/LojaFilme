import { Router, RouterModule } from '@angular/router';
import { Film } from '../list-films/film.model';
import { ListFilmsComponent } from './../list-films/list-films.component';
import { Component, OnInit } from '@angular/core';
import { CheckoutService } from './checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  listSelectedFilms: Film[] =[];
  totalPrice!: number;
  disabled = false;
  hide = true;
  form: any;
  client: any = {};


  constructor(private checkoutService: CheckoutService, private route: Router) { }
// Mostra os filmes selecionados para compra e o preço e o campo para inserir o nome
  ngOnInit(): void {
    this.form = document.querySelector('#form');
    this.form.addEventListener('click', (event:any)=>{
      event.preventDefault();
    })
    this.totalPrice = this.checkoutService.totalPrice;
    this.listSelectedFilms = this.checkoutService.listSelectedFilms;
    this.toogleButton();
  }

  //Confirma pagamento e retorna para catalogo
  payment():void{
    if(
      this.client.address === undefined ||
      this.client.name === undefined ||
      this.client.password === undefined
      ){
        this.checkoutService.showMessage('Porfavor entre com dados válidos.', false);
      } else {
        this.checkoutService.showMessage('Pagamento efetuado com sucesso! ' , true);
        this.route.navigate(['../list-films']);
      }
    
    
  }
// Volta para catalogo de filmes
  cancel(): void{
this.route.navigate(['../list-films'])
  }
// Se não houver filme na lista, desabilita a inserção do nome
  toogleButton(){
    if (this.listSelectedFilms.length == 0){
     this.disabled = true; 
    }
  }
// Exclui um filme da lista de compras
  exclude(film: Film ): void {
    this.totalPrice -= film.price;
    this.checkoutService.setFilm(film);
    this.checkoutService.unselectFilm();
    if(this.totalPrice <= 0){
      this.excludeAll();
    }
    }
//Exclue todos os filmes da lista de compras
    excludeAll(){
      this.checkoutService.totalPrice = 0;
      this.totalPrice = 0;
      this.checkoutService.listSelectedFilms = [];
      this.listSelectedFilms = [];
      this.toogleButton();
    }
}
