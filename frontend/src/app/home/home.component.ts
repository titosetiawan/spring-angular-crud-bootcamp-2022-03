import { Component, OnInit } from '@angular/core';
import {Product} from "../model/product.model";
import {MasterService} from "../service/master.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  list!: Product[]

  constructor(private mast: MasterService) { }

  ngOnInit(): void {
    this.mast.list().subscribe( {
      next: hasil => {
        this.list = hasil;
      },
      error: err => {
        console.log(err)
      }
    })
  }

}
