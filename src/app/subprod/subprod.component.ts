import { Component, OnInit, OnDestroy } from "@angular/core";
import { ApiserviceService } from "../services/apiservice.service";
import { DataService } from "../services/data.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription, from } from "rxjs";

@Component({
  selector: "app-subprod",
  templateUrl: "./subprod.component.html",
  styleUrls: ["./subprod.component.css"]
})
export class SubprodComponent implements OnInit, OnDestroy {
  public pppid;
  public cat_id;
  public products;
  subscriptions = [];
  public img_url = "https://medtech.creopedia.com/media/";

  constructor(
    private apiService: ApiserviceService,
    private route: ActivatedRoute,
    
  ) {
   
  }

  ngOnInit() {
    // this.cat_id='';
    // this.subscriptions.push(
    //   this.route.queryParams.subscribe(param => {
    //     this.cat_id = param.id;
    //   })
    // ); 

    this.cat_id = this.route.snapshot.paramMap.get('id');
    if(this.cat_id) {
      this.getprod();
    } else {
      this.getAll();
    }
   
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  getprod() {
    this.apiService.getProducts(this.cat_id).subscribe(response => {
      if (response["code"] === "200") {
        this.products = response["data"];
      } else  {
        this.products = [];
      }
    });
  }

  getAll() {
    this.apiService.getAllProducts().subscribe( response => {
      if(response["code"]==="200") {
        this.products = response["data"];
      }
    })
  }
}
