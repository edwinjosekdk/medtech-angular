import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { areAllEquivalent } from "@angular/compiler/src/output/output_ast";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ApiserviceService {
  constructor(private _http: HttpClient) {}

  private api_url = environment.api_url;

  private handleError(error: Response | any) {
    return Observable.throw(error);
  }

  private headerDict = {
    "Content-Type": "application/json",
    Accept: "application/json"
  };

  private requestOptions = {
    headers: new HttpHeaders(this.headerDict)
  };

  medreg(name, mob, email, pass) {
    return this._http
      .post(
        this.api_url + "user_login/register_api/",
        JSON.stringify({
          name: name,
          phone_no: mob,
          email: email,
          password: pass
        }),
        this.requestOptions
      )
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  medrequest(user_name, email, phone, productid) {
    console.log(user_name, email, phone, productid);
    return this._http
      .post(
        this.api_url + "user_order/request_product/",
        JSON.stringify({
          user_name: user_name,
          email: email,
          phone: phone,
          pdt_id: productid
        }),
        this.requestOptions
      )
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  getorderslist(token){
    return this._http
    .post(
      this.api_url + "user_order/order_status/",
      JSON.stringify({
        token: token        
      }),
      this.requestOptions
    )
    .pipe(
      map(response => {
        return response;
      })
    );
  }

  cart(token){
    return this._http
    .post(
      this.api_url+"user_order/cart_view/",
      JSON.stringify({
        token: token
      }),
      this.requestOptions
    )
    .pipe(
      map(response => {
        return response;
      })
    );
  }

  addcart(pdt_id,token,count){
    return this._http
    .post(
      this.api_url+"user_order/add_cart/",
      JSON.stringify({
        pdt_id: pdt_id,
        token: token,
        count: count
      }),
      this.requestOptions
    )
    .pipe(
      map(response => {
        return response;
      })
    );
  }

  requestproduct(prod, tokkn) {
    return this._http
      .post(
        this.api_url + "user_order/order_request/",
        JSON.stringify({
          pdt_id: prod,
          token: tokkn
        }),
        this.requestOptions
      )
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  medlogin(logname, logpass) {
    return this._http
      .post(
        this.api_url + "user_login/login_user/",
        JSON.stringify({ email: logname, password: logpass }),
        this.requestOptions
      )
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  changepassword(tok, oldp, newp) {
    return this._http
      .post(
        this.api_url + "user_login/change_password/",
        JSON.stringify({ token: tok, old_password: oldp, new_password: newp }),
        this.requestOptions
      )
      .pipe(
        map(Response => {
          return Response;
        })
      );
  }

  sendresetreq(username, typ, ph, em) {
    return this._http
      .post(
        this.api_url + "/user_login/forgot_password/",
        JSON.stringify({ name: username, type: typ, phone: ph, email: em }),
        this.requestOptions
      )
      .pipe(
        map(Response => {
          return Response;
        })
      );
  }

  otpischeck(username, otp) {
    return this._http
      .post(
        this.api_url + "user_login/otp_verify/",
        JSON.stringify({ name: username, otp: otp }),
        this.requestOptions
      )
      .pipe(
        map(Response => {
          return Response;
        })
      );
  }

  otpreset(username, passsword) {
    return this._http
      .post(
        this.api_url + "user_login/reset_password/",
        JSON.stringify({ name: username, password: passsword }),
        this.requestOptions
      )
      .pipe(
        map(Response => {
          return Response;
        })
      );
  }

  getProducts(id) {
    return this._http
      .post(
        this.api_url + "product_details/sub_product/",
        JSON.stringify({ id: id }),
        this.requestOptions
      )
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  getselectedcategory(ids) {
    return this._http
      .post(
        this.api_url + "product_details/sub_category/",
        JSON.stringify({ id: ids }),
        this.requestOptions
      )
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  getAllProducts() {
    return this._http
      .get(
        this.api_url + "product_details/product_detail/",
        this.requestOptions
      )
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  getProductDetails(pid) {
    return this._http
      .post(
        this.api_url + "product_details/detail_product/",
        JSON.stringify({ id: pid }),
        this.requestOptions
      )
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  qtyupdate(tok,pid,count){
    return this._http
      .post(
        this.api_url + "user_order/cart_add/",
        JSON.stringify({ 
          token:tok,
          pdt_id: pid,
          count: count 
        }),
        this.requestOptions
      )
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  removeitem(tok, pid){
    return this._http
      .post(
        this.api_url + "user_order/cart_remove/",
        JSON.stringify({ 
          token:tok,
          pdt_id: pid
        }),
        this.requestOptions
      )
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  getnavlist() {
    return this._http
      .get(this.api_url + "product_details/main_cat/", this.requestOptions)
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  getsubcateg(scpid) {
    return this._http
      .post(
        this.api_url + "product_details/sub_category/",
        JSON.stringify({ id: scpid }),
        this.requestOptions
      )
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  getnewcat() {
    return this._http
      .get(this.api_url + "product_details/all_category/", this.requestOptions)
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  placeorder(
    token,
    pdt_id,
    mode,
    qty,
    pay_id,
    name,
    city,
    state,
    zip,
    phone,
    email,
    house_no,
    area,
    landmark
  ) {
    return this._http
      .post(
        this.api_url + "user_order/order_place/",
        JSON.stringify({
          token: token,
          pdt_id: pdt_id,
          mode: mode,
          qty: qty,
          pay_id: pay_id,
          name: name,
          city: city,
          state: state,
          zip: zip,
          phone: phone,
          email: email,
          house_no: house_no,
          area: area,
          landmark: landmark
        }),
        this.requestOptions
      )
      .pipe(
        map(response => {
          return response;
        })
      );
  }


  moredesc(pdt_id) {
    return this._http
      .post(
        this.api_url + "product_details/category_description/",
        JSON.stringify({ pdt_id: pdt_id }),
        this.requestOptions
      )
      .pipe(
        map(response => {
          return response;
        })
      );
  }
}
