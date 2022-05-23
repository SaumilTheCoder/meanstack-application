import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { DummydataServiceService } from 'src/app/dummydata-service.service';

@Component({
  selector: 'app-paging-table',
  templateUrl: './paging-table.component.html',
  styleUrls: ['./paging-table.component.scss']
})
export class PagingTableComponent implements OnInit {
  title="testing api.."
  products$;
  readData:any;
  pageSize = 10;
 
  constructor(
    private productService: ProductService,
    private service:DummydataServiceService
  ) 
  {
    this.service.users().subscribe((data)=>{
        this.readData=data;
        })

    // service.users().subscribe((data)=>{
    //   // console.warn("data check..",data);
    //   this.readdata=data;
    //   console.warn("data check123..",this.readdata);
      
    // });  
  }

  ngOnInit() {
    this.products$ = this.productService.getProducts();
  }

}
