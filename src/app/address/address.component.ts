import { Component, OnInit } from "@angular/core";
import { ApiserviceService } from "../services/apiservice.service";
import { ActivatedRoute, Router } from "@angular/router";
declare const $: any;
declare const Razorpay: any;

@Component({
  selector: "app-address",
  templateUrl: "./address.component.html",
  styleUrls: ["./address.component.css"]
})
export class AddressComponent implements OnInit {
  constructor(private apiService: ApiserviceService, private router: Router) {}
  public user;
  public quan;
  public price;
  public prodid;
  public medtech_mode;

  public alert;

  public medtech_name = "akhil";
  public medtech_city = "adfasdasd";
  public medtech_state = "dasdasd";
  public medtech_zip = "123123";
  public medtech_mob = "9947791911";
  public medtech_email = "aewrads@sdfsdf.fsdfsdf";
  public medtech_hno = "sdfsdf";
  public medtech_area = "dfcsdfdsf";
  public medtech_lmrk = "sfsdgweresdf";

  public paymentid;
  ngOnInit() {
    this.price = sessionStorage.medtech_price;
    this.quan = sessionStorage.medtech_quan;
    this.prodid = sessionStorage.medtech_prodid;
  }

  purchaseproduct() {
    this.apiService
      .placeorder(
        sessionStorage.user,
        this.prodid,
        this.medtech_mode,
        this.quan,
        (this.paymentid = ""),
        this.medtech_name,
        this.medtech_city,
        this.medtech_state,
        this.medtech_zip,
        this.medtech_mob,
        this.medtech_email,
        this.medtech_hno,
        this.medtech_area,
        this.medtech_lmrk
      )
      .subscribe(response => {
        if (response["message"] === "success") {
          console.log(response["message"]);
          // setTimeout(() => {
          //   console.log("api send sss");
          // }, 3500);
        } else {
          console.log("api send fail");
          // setTimeout(() => {
          //   console.log("api send fff");
          // }, 3500);
        }
      });
  }

  mode(event) {
    if (event.target.id === "cod") {
      this.medtech_mode = "cod";
    } else this.medtech_mode = "online";
  }

  shopnow() {
    if (sessionStorage.user) {
      if (this.medtech_mode === "cod") {
        this.purchaseproduct();
      } else if (this.medtech_mode === "online") {
        console.log("online");
        this.payNow();
      } else {
        this.alert = "Choose payment option";
        setTimeout(() => {
          this.alert = "";
        }, 3500);
      }
    } else {
      $("#login-modal").modal("show");
    }
  }

  payNow() {
    this.price = sessionStorage.medtech_price;
    this.quan = sessionStorage.medtech_quan;
    this.prodid = sessionStorage.medtech_prodid;
    var self = this;
    var options = {
      // key: "rzp_live_MquWTYi6ypIVBE",
      key: "rzp_test_Sc2QOgXEJcedKm",
      amount: self.price * self.quan * 100,
      currency: "INR",
      name: self.medtech_name,
      description: "Pay for your Product",
      phone: self.medtech_mob,
      handler: function(response) {
        self.paymentid = response.razorpay_payment_id;
        self.paymentResp();
      },

      notes: {
        address: "note value"
      },
      prefill: {
        contact: self.medtech_mob,
        email: self.medtech_email
      },
      theme: {
        color: "#5C25B7"
      }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
  }

  paymentResp() {
    this.user = sessionStorage.user;
    this.apiService
      .placeorder(
        this.user,
        this.prodid,
        this.medtech_mode,
        this.quan,
        this.paymentid,
        this.medtech_name,
        this.medtech_city,
        this.medtech_state,
        this.medtech_zip,
        this.medtech_mob,
        this.medtech_email,
        this.medtech_hno,
        this.medtech_area,
        this.medtech_lmrk
      )
      .subscribe(
        response => {
          if (response["message"] == "success") {
            this.router.navigate(["/paymode"]);
          } else {
            this.router.navigate(["/fail"]);
          }
        },
        error => {
          console.log(error);
          this.router.navigate(["/fail"]);
        }
      );
  }
}
