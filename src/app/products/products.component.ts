import { Component, OnInit, OnDestroy } from "@angular/core";
import { ApiserviceService } from "../services/apiservice.service";
import { DataService } from "../services/data.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription, from } from "rxjs";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {

  public token;
  public order_det;

  constructor(
    private apiService: ApiserviceService,
    private route: ActivatedRoute
  ) {}

  
  ngOnInit() {
    this.orders();
  }

  orders(){
    this.token = sessionStorage.user;
    this.apiService.getorderslist(this.token).subscribe(response => {
      if (response["code"] === "200") {
        // console.log(response);
        this.order_det = response["odr_det"];
        console.log(response["odr_det"]);
      } else {
        console.log("error")
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
