import { Component, OnInit, OnDestroy } from "@angular/core";
import { ApiserviceService } from "../services/apiservice.service";
import { DataService } from "../services/data.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription, from } from "rxjs";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.css"]
})
export class CategoriesComponent implements OnInit {
  public ids;
  public cattg;
  public subcategory;
  public description;
  public link;
  public idb;
  public name;

  constructor(
    private apiService: ApiserviceService,
    private route: Router,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    this.ids = this.router.snapshot.paramMap.get("ids");
    this.getselectedcateg();
  }

  getselectedcateg() {
    this.apiService.getselectedcategory(this.ids).subscribe(response => {
      this.cattg = response["data"];
      console.log(response);
      this.subcategory = response["data"];
      this.description = response["des"];
      this.link = response["link"];
      this.name = response["name"]
    });
  }

  gotoproducts(idb) {
    this.route.navigate(["/subprod", idb]);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }


}
