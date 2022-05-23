import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ApiserviceService } from 'src/app/apiservice.service';
import { BackendService } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.scss']
})
export class FilterTableComponent implements OnInit {
  Books:any=[];
  searchControl: FormControl = new FormControl();
  products;
  // students;
  img="https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg";
  filteredProducts;
  searchProducts;
  viewMode: 'list' | 'grid' = 'list';
  allSelected: boolean;
  url="assets/uplodas/capsicum.jpeg";
  page = 1;
  pageSize = 10;
  // products: any[] = [];
  successmsg: any;
  getparamid:any;
  searchbar: any[];
  readData:any;



  constructor(
    private productService: ProductService,
    private crudApi:ApiserviceService,
    private router:ActivatedRoute,
  ) { }

  // readData:any;

  ngOnInit():void {
    this.crudApi.getStudent().subscribe(res=>{
      console.log("listing",res);
      this.Books = res;
    })
  }

  delete(id:any,i:any){
    console.log(id,'deleteid==>');

    if(confirm("Are you sure want to delete ?"))
    {
    this.crudApi.studentdelete(id).subscribe((res)=>{
              console.log(res,'deleteres==>');
              this.successmsg = res.message;
      
              this.crudApi.getStudent().subscribe((res)=>{
                  console.log(res,"res==>");
                  this.Books.splice(i,1);
                  // this.getStudent();
              });
          });
  }
}

  // delete(id:any,i:any){
  //   // alert("hii delete")
  //   console.log(id);
  //   if(window.confirm('Are you sure want to Delete ??')){
  //     this.crudApi.studentdelete(id).subscribe(res=>{
  //       this.Books.splice(i,1);
  //     })
  //   }
  // }
  
  filerData(val) {
    if (val) {
      val = val.toLowerCase();
    } else {
      return this.filteredProducts = [...this.products];
    }

    const columns = Object.keys(this.products[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.products.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        // console.log(d[column]);
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.filteredProducts = rows;
  }

  searchData(val) {
    if (val) {
      val = val.toLowerCase();
    } else {
      // alert("checking..");
      return this.searchProducts = [...this.products];
    }

    const columns = Object.keys(this.products[0]);
    if (!columns.length) {
      return;
    }

    const rows = this.products.filter(function(d) {
      for (let i = 0; i <= columns.length; i++) {
        const column = columns[i];
        // console.log(d[column]);
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });
    this.searchProducts = rows;
  }

  selectAll(e) {
    this.products = this.products.map(p => {
      p.isSelected = this.allSelected;
      return p;
    });

    if (this.allSelected) {

    }
    console.log(this.allSelected);
  }

}
