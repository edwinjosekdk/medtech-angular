import { Component, OnInit, OnChanges } from "@angular/core";
import { ApiserviceService } from "../services/apiservice.service";
import { ActivatedRoute, Router } from "@angular/router";
import { from } from "rxjs";
declare var $: any;

@Component({
  selector: "app-single",
  templateUrl: "./single.component.html",
  styleUrls: ["./single.component.css"]
})
export class SingleComponent implements OnInit, OnChanges {
  public product_id;
  public img_url = "https://medtech.creopedia.com/media/";
  public product_details;
  public tokkn;
  public btntxt = "Request Quote";

  constructor(
    private apiService: ApiserviceService,
    private route: ActivatedRoute
  ) {}

  public quantity = "1";
  public productid;

  ngOnChanges() {
    this.route.queryParams.subscribe(param => {
      if (param.id) {
        this.product_id = param.id;
      }
    });
    this.getProductDetails();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(param => {
      if (param.id) {
        this.product_id = param.id;
      }
    });
    this.getProductDetails();

    this.tokkn = sessionStorage.user;
  }

  getProductDetails() {
    this.apiService.getProductDetails(this.product_id).subscribe(response => {
      if (response["code"] === "200") {
        this.product_details = response["data"][0];
        sessionStorage.setItem("medtech_price", this.product_details.price);
      }
    });
    this.productid = this.product_id;
  }

  qty() {
    sessionStorage.setItem("medtech_quan", this.quantity);
    sessionStorage.setItem("medtech_prodid", this.productid);
  }

  qtyChange(){
    console.log(this.quantity);
    if(+this.quantity < 1) {
      this.quantity = "1";
    }
    console.log(this.quantity);
  }

  requestp(id) {
    this.btntxt = "Requesting....";
    this.tokkn = sessionStorage.user;
    if (this.tokkn) {
      this.apiService.requestproduct(id, this.tokkn).subscribe(
        response => {
          if (response["message"] === "success") {
            this.btntxt = "Request Sent";
            setTimeout(() => {
              this.btntxt = "Request Quote";
            }, 3000);
          } else {
            this.btntxt = "Request Error!"
            setTimeout(() => {
              this.btntxt = "Request Quote";
            }, 3000);
           
          }
        },
        error => {
          this.btntxt = "Request Error!"
            setTimeout(() => {
              this.btntxt = "Request Quote";
            }, 3000);
        }
      );

      console.log(sessionStorage.user);
    } else {
      this.btntxt = "Request Quote";
      $("#login-modal").modal("show");
    }
  }
}
