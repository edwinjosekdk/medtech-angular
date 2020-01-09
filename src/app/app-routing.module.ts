import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { ProductsComponent } from "./products/products.component";
import { PartnersComponent } from "./partners/partners.component";
import { CareersComponent } from "./careers/careers.component";
import { ContactComponent } from "./contact/contact.component";
import { CategoriesComponent } from "./categories/categories.component";
import { SingleComponent } from "./single/single.component";
import { SubprodComponent } from "./subprod/subprod.component";
import { AddressComponent } from "./address/address.component";
import { PaymodeComponent } from "./paymode/paymode.component";
import { FailComponent } from "./fail/fail.component";
import { CartComponent } from "./cart/cart.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: "orders",
    component: ProductsComponent
  },
  {
    path: "partners",
    component: PartnersComponent
  },
  {
    path: "careers",
    component: CareersComponent
  },
  {
    path: "contact",
    component: ContactComponent
  },
  {
    path: "categories",
    component: CategoriesComponent
  },
  {
    path: "categories/:ids",
    component: CategoriesComponent
  },
  {
    path: "single",
    component: SingleComponent
  },
  {
    path: "single/:id",
    component: SingleComponent
  },
  {
    path: "subprod",
    component: SubprodComponent
  },
  {
    path: "subprod/:id",
    component: SubprodComponent
  },
  {
    path: "address",
    component: AddressComponent
  },
  {
    path: "paymode",
    component: PaymodeComponent
  },

  {
    path: "fail",
    component: FailComponent
  },
  {
    path: "cart",
    component: CartComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "enabled",
      onSameUrlNavigation: "reload"
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
