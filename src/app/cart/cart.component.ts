import { Component, OnInit } from "@angular/core";
import { ApiserviceService } from "../services/apiservice.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  public cartlist;

  constructor(
    private apiService: ApiserviceService,
    private route: Router,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    this.viewcart();
  }

  viewcart() {
    this.apiService.cart(sessionStorage.user).subscribe(response => {
      console.log(response);
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
