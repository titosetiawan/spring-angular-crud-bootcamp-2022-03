import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MasterService} from "../service/master.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Products} from "../model/products.model";

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent implements OnInit {
  formAdd!: FormGroup;
  id!: number;

  constructor(private formBuild: FormBuilder,
              private mast: MasterService,
              private router: Router,
              private route: ActivatedRoute) {
    this.formAdd = this.formBuild.group({
      'id': [null],
      'name': [null],
      'price': [null],
      'category': [null],
      'create_date': [null],
      'create_by': [null]
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(rute => {
      this.id = parseInt(rute['id']);
      if (this.id) {
        console.log(this.id)
        this.mast.getId(this.id).subscribe({
          next: value => {
            this.formAdd.controls['id'].setValue(value.id)
            this.formAdd.controls['name'].setValue(value.name)
            this.formAdd.controls['price'].setValue(value.price)
            this.formAdd.controls['category'].setValue(value.category)
            this.formAdd.controls['create_date'].setValue(value.create_date)
            this.formAdd.controls['create_by'].setValue(value.create_by)
          }
        })
      }
    })

  }

  simpan(): void {
    console.log(this.formAdd.controls)
    console.log(this.formAdd.valid)
    if (this.formAdd.valid) {
      let product = <Products>{};
      product.id = this.formAdd.controls['id'].value
      product.name = this.formAdd.controls['name'].value
      product.price = this.formAdd.controls['price'].value
      product.create_date = this.formAdd.controls['create_date'].value
      product.create_by = this.formAdd.controls['create_by'].value
      if (this.id) {
        product.id = this.id;
      }
      this.mast.insert(product).subscribe({
        next: hasil => {
          alert("simpan berhasil")
        },
        error: err => {
          const pesan: any[] = err.error.status;
          let msg = '';
          for (let i = 0; i < pesan.length; i++) {
            msg += pesan[i].field + " : " + pesan[i].defaultMessage + "\n";
          }
        }
      });
    } else {
      alert("Form harus terisi semua")
    }
  }
}
