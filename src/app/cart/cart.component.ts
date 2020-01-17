import { Component, OnInit } from "@angular/core";
import { ApiserviceService } from "../services/apiservice.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
declare const $: any;
declare const Razorpay: any;

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  public cartlist;
  public total;
  public errormssg;
  public img_url = "https://medtech.creopedia.com/media/";

  public name;
  public mob;
  public email;
  public hno;
  public area;
  public lmrk;
  public city;
  public state;
  public zip;

  public paymentid;

  constructor(
    private apiService: ApiserviceService,
    private route: Router,
    private router: ActivatedRoute
  ) {}
  registerForm: FormGroup;

  ngOnInit() {
    this.viewcart();

    this.registerForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(
          "[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"
        )
      ]),
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      tel: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(/^-?(0|[1-9]\d*)?$/)
      ]),
      housenumber: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(6)
      ]),
      area: new FormControl("", [Validators.required, Validators.minLength(3)]),
      landmark: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      city: new FormControl("", [Validators.required, Validators.minLength(3)]),
      state: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      zipcode: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(6),
        Validators.pattern(/^-?(0|[1-9]\d*)?$/)
      ])
      // selectedCountryCode: new FormControl('', Validators.required),
      // gender: new FormControl('', Validators.required)
    });
  }

  addr() {
    this.name = this.registerForm.value.name;
    this.mob = this.registerForm.value.tel;
    this.email = this.registerForm.value.email;
    this.hno = this.registerForm.value.housenumber;
    this.area = this.registerForm.value.area;
    this.lmrk = this.registerForm.value.landmark;
    this.city = this.registerForm.value.city;
    this.state = this.registerForm.value.state;
    this.zip = this.registerForm.value.zipcode;

    this.clearErrors();
    this.payNow();
  }

  payNow() {
    $("#address-modal").modal("hide");
    var self = this;
    var options = {
      // key: "rzp_live_MquWTYi6ypIVBE",
      key: "rzp_live_NfmcD7b83Mqza4",
      amount: self.total * 100,
      currency: "INR",
      name: self.name,
      description: "Pay for your Product",
      phone: self.mob,
      handler: function(response) {
        self.paymentid = response.razorpay_payment_id;
        self.placeorderall();
      },

      notes: {
        address: "note value"
      },
      prefill: {
        contact: self.registerForm.value.tel,
        email: self.registerForm.value.email
      },
      theme: {
        color: "#5C25B7"
      }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
  }

  placeorderall() {
    const user = sessionStorage.user;
    this.apiService
      .placeordermany(
        user,
        this.paymentid,
        this.total,
        this.name,
        this.hno,
        this.area,
        this.lmrk,
        this.city,
        this.state,
        this.zip,
        this.mob,
        this.email
      )
      .subscribe(
        response => {
          if (response["message"] == "success") {
            this.route.navigate(["/paymode"]);
          } else {
            this.route.navigate(["/fail"]);
          }
        },
        error => {
          console.log(error);
          this.route.navigate(["/fail"]);
        }
      );
  }

  clearErrors() {
    this.registerForm.controls["name"].setErrors(null);
    this.registerForm.controls["tel"].setErrors(null);
    this.registerForm.controls["email"].setErrors(null);
    this.registerForm.controls["housenumber"].setErrors(null);
    this.registerForm.controls["area"].setErrors(null);
    this.registerForm.controls["landmark"].setErrors(null);
    this.registerForm.controls["city"].setErrors(null);
    this.registerForm.controls["state"].setErrors(null);
    this.registerForm.controls["zipcode"].setErrors(null);
  }

  viewcart() {
    if (sessionStorage.user) {
      this.apiService.cart(sessionStorage.user).subscribe(response => {
        console.log(response);
        if (response["message"] === "success") {
          this.cartlist = response["data"];
          this.total = response["total"];
        } else {
          this.cartlist = [];
          this.errormssg = "Error loading cart";
          $("#cart_res-modal").modal("show");
        }
      });
    } else {
      this.errormssg = "Please Login";
      $("#cart_res-modal").modal("show");
    }
  }

  countupdate(pid) {
    const count = $("#" + pid).val();
    this.apiService
      .qtyupdate(sessionStorage.user, pid, count)
      .subscribe(response => {
        if (response["message"] === "success") {
          this.viewcart();
        } else {
          this.errormssg = "Update Unsuccessful";
          $("#cart_res-modal").modal("show");
        }
      });
  }

  trash(pid) {
    this.apiService.removeitem(sessionStorage.user, pid).subscribe(response => {
      if (response["message"] === "success") {
        this.viewcart();
      } else {
        this.errormssg = "Product Deleted";
        $("#cart_res-modal").modal("show");
      }
    });
  }

  addComma(data) {
    var x = data;
    x = x.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != "") lastThree = "," + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
  }
}
