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

}
