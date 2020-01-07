import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ProductsComponent } from './products/products.component';
import { PartnersComponent } from './partners/partners.component';
import { CareersComponent } from './careers/careers.component';
import { ContactComponent } from './contact/contact.component';
import { CategoriesComponent } from './categories/categories.component';
import { SingleComponent } from './single/single.component';
import { SubprodComponent } from './subprod/subprod.component';

import { ApiserviceService } from './services/apiservice.service';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './services/data.service';
import { AddressComponent } from './address/address.component';
import { PaymodeComponent } from './paymode/paymode.component';
import { FailComponent } from './fail/fail.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    AboutComponent,
    ProductsComponent,
    PartnersComponent,
    CareersComponent,
    ContactComponent,
    CategoriesComponent,
    SingleComponent,
    SubprodComponent,
    AddressComponent,
    PaymodeComponent,
    FailComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ApiserviceService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
