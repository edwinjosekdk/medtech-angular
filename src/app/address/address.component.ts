import { Component, OnInit } from "@angular/core";
import { ApiserviceService } from "../services/apiservice.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from '@angular/forms';

declare const $: any;
declare const Razorpay: any;

@Component({
  selector: "app-address",
  templateUrl: "./address.component.html",
  styleUrls: ["./address.component.css"]
})
export class AddressComponent implements OnInit {
  constructor(private apiService: ApiserviceService, private router: Router) {}
  registerForm: FormGroup;
  public user;
  public quan;
  public price;
  public prodid;
  public medtech_mode;

  public alert;

  public medtech_name = "";
  public medtech_city = "";
  public medtech_state = "";
  public medtech_zip = "";
  public medtech_mob = "";
  public medtech_email = "";
  public medtech_hno = "";
  public medtech_area = "";
  public medtech_lmrk = "";

  public paymentid;
  ngOnInit() {
    this.price = sessionStorage.medtech_price;
    this.quan = sessionStorage.medtech_quan;
    this.prodid = sessionStorage.medtech_prodid;
    this.registerForm = new FormGroup({
      email: new FormControl('', [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
      ]),
      name: new FormControl('', [
          Validators.required,
          Validators.minLength(3)
      ]),
      tel: new FormControl('', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(/^-?(0|[1-9]\d*)?$/)
      ]),
      housenumber: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(6)
      ]),
       area: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      landmark: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      state: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      zipcode: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(6),
        Validators.pattern(/^-?(0|[1-9]\d*)?$/)
      ]),
      // selectedCountryCode: new FormControl('', Validators.required),
      // gender: new FormControl('', Validators.required)
  });
  }

  purchaseproduct() {
    var name = this.registerForm.value.name;
    var city = this.registerForm.value.city;
    var state = this.registerForm.value.state;
    var zip = this.registerForm.value.zipcode;
    var mob = this.registerForm.value.tel;
    var email = this.registerForm.value.email;
    var hno = this.registerForm.value.housenumber;
    var area = this.registerForm.value.area;
    var lmrk = this.registerForm.value.landmark;
    console.log("name",name);
    this.apiService
      .placeorder(
        sessionStorage.user,
        this.prodid,
        this.medtech_mode,
        this.quan,
        (this.paymentid = ""),
        name,
        city,
        state,
        zip,
        mob,
        email,
        hno,
        area,
        lmrk
      )
      .subscribe(response => {
        if (response["message"] === "success") {
          this.router.navigate(["/paymode"]);
          // setTimeout(() => {
          //   console.log("api send sss");
          // }, 3500);
        } else {
          this.router.navigate(["/fail"]);
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
    console.log("here......");
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
