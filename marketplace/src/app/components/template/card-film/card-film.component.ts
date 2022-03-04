import { CheckoutService } from './../../../views/checkout/checkout.service';
import { Film } from '../../../views/list-films/film.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-film',
  templateUrl: './card-film.component.html',
  styleUrls: ['./card-film.component.css']
})
export class CardFilmComponent implements OnInit {
listFilms: Film[] = [];

  constructor(private checkoutService:CheckoutService) { }

  //Inicia os filmes
  ngOnInit(): void {
    this.checkoutService.getListFilms().subscribe((film)=>{
      this.listFilms = film;
    })
  }

//Informações de cada filme, preço..
selectFilm(film: Film):void{
  this.checkoutService.setFilm(film);
  this.checkoutService.setPrice(film.price);
}
}
