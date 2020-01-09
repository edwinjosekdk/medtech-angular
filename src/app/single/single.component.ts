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
  public user_name = "";
  public email = "";
  public phone = "";
  public result_com = "";

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
        console.log(this.product_details.price);
      }
    });
    this.productid = this.product_id;
  }

  qty() {
    sessionStorage.setItem("medtech_quan", this.quantity);
    sessionStorage.setItem("medtech_prodid", this.productid);
  }

  qtyChange() {
    console.log(this.quantity);
    if (+this.quantity < 1) {
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
            this.btntxt = "Request Sent Success";
            this.result_com = "Request Sent Success";
            $("#res-modal").modal("show");
            // setTimeout(() => {
            //   this.btntxt = "Request Quote";
            // }, 3000);
          } else {
            this.btntxt = "Request Error!";
            setTimeout(() => {
              this.btntxt = "Request Quote";
            }, 3000);
          }
        },
        error => {
          this.btntxt = "Request Error!";
          setTimeout(() => {
            this.btntxt = "Request Quote";
          }, 3000);
        }
      );

      console.log(sessionStorage.user);
    } else {
      this.btntxt = "Request Quote";
      $("#req-modal").modal("show");
    }
  }

  medreq() {
    if (this.user_name != "" && this.email != "" && this.phone != "") {
      this.apiService
        .medrequest(this.user_name, this.email, this.phone, this.productid)
        .subscribe(response => {
          if (response["message"] === "success") {
            this.result_com = "Request Sent Success";
            $("#req-modal").modal("hide");
            $("#res-modal").modal("show");
          } else {
            this.result_com = "Request not Send";
            $("#res-modal").modal("show");
            setTimeout(() => {
              $("#req-modal").modal("hide");
            }, 3000);
          }
        });
    } else {
      this.result_com = "Request not Send";
      $("#res-modal").modal("show");
      $("#req-modal").modal("hide");
      setTimeout(() => {
        $("#req-modal").modal("show");
        $("#res-modal").modal("hide");
      }, 3000);
    }
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
