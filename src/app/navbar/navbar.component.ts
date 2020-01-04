import { Component, OnInit } from "@angular/core";
import { ApiserviceService } from "../services/apiservice.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SubprodComponent } from "../subprod/subprod.component";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { from } from "rxjs";
declare var $: any;

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  registerForm: FormGroup;
  public log_user;
  public otp_phone = true;
  public otp_email = false;
  public otpid = "phone";
  public otp_val_phone = '';
  public otp_val_email = '';
  public otp_username = '';
  public otp_number;
  public otp_newpass;
  public otp_newrepass;

  public newpass;
  public newrepass;
  public oldpass;
  public dispmssg = "invalid";

  public name;
  public mob;
  public email;
  public pass;
  public repass;
  public forgot_modal_error = false;
  public misError = false;

  public logname = "edwinjosekdk@gmail.com";
  public logpass = "1234";

  // public logname;
  // public logpass;

  public loggedin = false;
  public username;

  public list;
  public menulist;
  public showSubmenu = {};

  public spid;

  public subcatDetails = [];
  public subprodComponent;

  public emailError = false;
  public passError = false;

  public loginError = false;
  public passwordMismatch = false;

  constructor(
    private apiService: ApiserviceService,
    private route: Router,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subprodComponent = new SubprodComponent(this.apiService, this.router);
    $(document).ready(function() {
      $("#show_hide_password button").on("click", function(event) {
        event.preventDefault();
        if ($("#show_hide_password input").attr("type") == "text") {
          $("#show_hide_password input").attr("type", "password");
          $("#show_hide_password i").addClass("fa-eye-slash");
          $("#show_hide_password i").removeClass("fa-eye");
        } else if ($("#show_hide_password input").attr("type") == "password") {
          $("#show_hide_password input").attr("type", "text");
          $("#show_hide_password i").removeClass("fa-eye-slash");
          $("#show_hide_password i").addClass("fa-eye");
        }
      });
    });

    $(document).ready(function() {
      $("#show_hide_password-re button").on("click", function(event) {
        event.preventDefault();
        if ($("#show_hide_password-re input").attr("type") == "text") {
          $("#show_hide_password-re input").attr("type", "password");
          $("#show_hide_password-re i").addClass("fa-eye-slash");
          $("#show_hide_password-re i").removeClass("fa-eye");
        } else if (
          $("#show_hide_password-re input").attr("type") == "password"
        ) {
          $("#show_hide_password-re input").attr("type", "text");
          $("#show_hide_password-re i").removeClass("fa-eye-slash");
          $("#show_hide_password-re i").addClass("fa-eye");
        }
      });
    });

    this.registerForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(
          "[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"
        )
      ]),
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6)
      ]),
      confirmPassword: new FormControl("", Validators.required),
      tel: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ])
      // selectedCountryCode: new FormControl('', Validators.required),
      // gender: new FormControl('', Validators.required)
    });

    this.chechUser();
    this.getlist();
    this.getprodlist();
    this.validate();
  }

  chechUser() {
    this.log_user = sessionStorage.user;
    if (this.log_user) {
      this.loggedin = true;
      this.username = sessionStorage.username;
    } else {
      this.loggedin = false;
    }
  }

  validateEmail() {
    this.loginError = false;
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (this.logname !== "") {
      if (!re.test(this.logname)) {
        this.emailError = true;
        return true;
      } else {
        this.emailError = false;
        return false;
      }
    } else {
      this.emailError = true;
      return true;
    }
  }

  validatePass() {
    this.loginError = false;
    if (this.logpass === "") {
      this.passError = true;
      return true;
    } else {
      this.passError = false;
      return false;
    }
  }

  alert_message = "";
  viewMsg_success = false;
  viewMsg_fail = false;

  medtest() {
    var name = this.registerForm.value.name;
    var email = this.registerForm.value.email;
    var mob = this.registerForm.value.tel;
    var pass = this.registerForm.value.password;
    var cpass = this.registerForm.value.confirmPassword;
    if (pass !== cpass) {
      this.passwordMismatch = true;
    } else {
      this.apiService.medreg(name, mob, email, pass).subscribe(response => {
        console.log(response);
        if (response["message"] === "success") {
          this.alert_message = "Registration Success";
          this.viewMsg_success = true;
          setTimeout(() => {
            this.viewMsg_success = false;
          }, 3500);
          this.registerForm.reset();
          this.clearErrors();

          $("#signup-modal").modal("hide");
          $("#login-modal").modal("show");
        } else {
          this.alert_message = "Email id already exist";
          this.viewMsg_fail = true;
          setTimeout(() => {
            this.viewMsg_fail = false;
          }, 3500);
        }
      });
    }
  }

  clearErrors() {
    this.registerForm.controls["name"].setErrors(null);
    this.registerForm.controls["email"].setErrors(null);
    this.registerForm.controls["tel"].setErrors(null);
    this.registerForm.controls["password"].setErrors(null);
    this.registerForm.controls["confirmPassword"].setErrors(null);
  }

  medlog() {
    this.validateEmail();
    this.validatePass();
    console.log("email Error", this.emailError);
    console.log("pass error", this.passError);
    if (!this.emailError && !this.passError) {
      console.log("herer");
      this.apiService
        .medlogin(this.logname, this.logpass)
        .subscribe(response => {
          console.log(response);
          if (response["message"] === "success") {
            sessionStorage.setItem("user", response["token"]);
            sessionStorage.setItem("username", response["data"]);
            this.username = response["data"];
            this.loggedin = true;
            $("#login-modal").modal("hide");
          } else if (response["message"] === "Invalid Credentials") {
            this.loginError = true;
          }
        });
    } else {
      console.log("sdfsdfdsfdsf");
    }
  }

  medlogout() {
    this.loggedin = false;
    // sessionStorage.setItem("user", "");
    delete sessionStorage.user;
    delete sessionStorage.username;
    this.chechUser();
  }

  getlist() {
    this.apiService.getnavlist().subscribe(response => {
      if (response["code"] === "200") {
        this.list = response["data"];
      }
    });
  }

  clear() {
    this.subcatDetails = [];
  }

  getsublist(id) {
    this.spid = id;
    this.subcatDetails = [];
    this.apiService.getsubcateg(this.spid).subscribe(response => {
      if (response["code"] === "200") {
        this.subcatDetails = response["data"];
      } else {
        this.subcatDetails = [];
      }
    });
  }

  routeTosub(id) {
    if (this.subcatDetails.length === 0) {
      this.route.navigate(["/subprod", id]);
    }

    if (this.subcatDetails.length === 0) {
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  }

  subroute(menu) {
    if (menu.child.length == 0) {
      this.route.navigate(["/subprod", menu.id]);
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  }

  subsubmenu(submenu) {
    this.route.navigate(["/subprod", submenu.id]);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

  getprodlist() {
    this.apiService.getnewcat().subscribe(response => {
      if (response["code"] === "200") {
        this.menulist = response["data"];
        for (let x of this.menulist) {
          this.showSubmenu[x.id] = false;
        }
      }
    });
  }

  changepass() {
    if (this.newpass === this.newrepass) {
      this.apiService
        .changepassword(sessionStorage.user, this.oldpass, this.newpass)
        .subscribe(response => {
          if (response["message"] === "success") {
            this.dispmssg = "Password Change Success";
          } else if (response["message"] === "current password") {
            this.dispmssg = "Passwords doesnot match";
          } else if (response["message"] === "invalid") {
            this.dispmssg = "Passwords doesnot match";
          } else if (response["message"] === "no user") {
            this.dispmssg = "Not loggedin!!!";
          }
        });
    } else if (
      this.newpass === "" ||
      this.newrepass === "" ||
      this.oldpass === ""
    ) {
      this.dispmssg = "empty input fields";
    } else {
      this.dispmssg = "Passwords doesnot match";
    }
  }

  displayotpphone() {
    this.otp_phone = true;
    this.otp_email = false;
    this.otpid = "phone";
  }
  displayotpemail() {
    this.otp_phone = false;
    this.otp_email = true;
    this.otpid = "email";
  }

  sendreset() {

    

    if(!this.forgot_modal_error){
    this.apiService
      .sendresetreq(
        this.otp_username,
        this.otpid,
        this.otp_val_phone,
        this.otp_val_email
      )
      .subscribe(response => {
        console.log(response);
        if(response["message"] === "success"){
          $("#otp-modal").modal("show");
        } else if(response["message"] === "invalid phone" || response["message"] === "invalid email"){
          this.dispmssg = "Phone or Email not registered";
          $("#result-modal").modal("show");
        } else if(response["message"]==="no user"){
          this.dispmssg = "Please Check your username";
          $("#result-modal").modal("show");
        }
        
      });
    }else{
      $("#forgotpass-modal").modal("show");

    }
  }

  otpcheck() {
    this.dispmssg = "Checking OTP...";
    $("#result-modal").modal("show");
    this.apiService
      .otpischeck(this.otp_username, this.otp_number)
      .subscribe(response => {
        console.log(response);
        if(response["message"]==="success"){
          $("#result-modal").modal("hide");
          $("#resettt-modal").modal("show");
        } else {
          this.dispmssg = "OTP error...please try again";
          $("#result-modal").modal("show");
        }
      });
  }

  otpresetchange() {
    this.dispmssg = "Changing password...";
    this.apiService
      .otpreset(this.otp_username, this.otp_newpass)
      .subscribe(response => {
        console.log(response);
        if (response["message"] === "success"){
          this.dispmssg = "Password Change Success";
          
        }
      });
  }


  checkPwd() {
    if(this.otp_newpass !== this.otp_newrepass){
      this.misError = true;
    } else{
      this.misError = false;
    }
  }


  validate() {
    if(this.otp_username === '') {
      this.forgot_modal_error = true;
    }else{
    if(this.otpid == "phone"){
      if(this.otp_val_phone === ''){
        this.forgot_modal_error = true;
      } else{
        this.forgot_modal_error = false;
      }
    }else{
      if(this.otp_val_email === ''){
        this.forgot_modal_error = true;
      }
      else{
        this.forgot_modal_error = false;
      }
    }
  }
  }
}
