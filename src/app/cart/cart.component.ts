import { Component, OnInit } from "@angular/core";
import { ApiserviceService } from "../services/apiservice.service";
import { ActivatedRoute, Router } from "@angular/router";
declare var $: any;

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

  constructor(
    private apiService: ApiserviceService,
    private route: Router,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    this.viewcart();
  }

  viewcart() {
    if(sessionStorage.user){
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
    }
    else{
      this.errormssg = "Please Login";
      $("#cart_res-modal").modal("show");
    }
    
  }

  countupdate(pid){
    const count = $("#"+pid).val()
    this.apiService.qtyupdate(sessionStorage.user, pid, count).subscribe(response => {
      if (response["message"] === "success") {
        this.viewcart();
      } else {
        this.errormssg = "Update Unsuccessful";
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
