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
  public description;
  public namez;
  public link;
  subscriptions = [];
  public img_url = "https://medtech.creopedia.com/media/";

  constructor(
    private apiService: ApiserviceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.cat_id='';
    // this.subscriptions.push(
    //   this.route.queryParams.subscribe(param => {
    //     this.cat_id = param.id;
    //   })
    // );

    this.cat_id = this.route.snapshot.paramMap.get("id");
    if (this.cat_id) {
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
      console.log(response);
      if (response["code"] === "200") {
        this.products = response["data"];
        this.description = response["des"];
        this.namez = response["name"];
        this.link = response["link"];
      } else {
        this.products = [];
      }
    });
  }

  getAll() {
    this.apiService.getAllProducts().subscribe(response => {
      if (response["code"] === "200") {
        this.products = response["data"];
      }
    });
  }

  addComma(data){
    var x=data;
    x=x.toString();
    var lastThree = x.substring(x.length-3);
    var otherNumbers = x.substring(0,x.length-3);
    if(otherNumbers != '')
    lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
    
    }
}
