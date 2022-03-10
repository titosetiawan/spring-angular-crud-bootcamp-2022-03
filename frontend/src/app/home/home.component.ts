import { Component, OnInit } from '@angular/core';
import {Products} from "../model/products.model";
import {MasterService} from "../service/master.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {error} from "@angular/compiler/src/util";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  list!: Products[]

  constructor(private mast: MasterService) { }

  ngOnInit(): void {
    if (this.list == null){
      console.log(true)
    }else {
      console.log(false)
    }
    console.log()
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
