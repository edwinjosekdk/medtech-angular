import { Component, OnInit } from "@angular/core";
import { ApiserviceService } from "../services/apiservice.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SubprodComponent } from "../subprod/subprod.component";
import { from } from "rxjs";
declare var $: any;

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  public log_user;

  public newpass;
  public newrepass;
  public oldpass;
  public dispmssg = "invalid";

  public name;
  public mob;
  public email;
  public pass;
  public repass;

  public logname = "edwinjosekdk@gmail.com";
  public logpass = "123";

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

  constructor(
    private apiService: ApiserviceService,
    private route: Router,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subprodComponent = new SubprodComponent(this.apiService, this.router);
    $(document).ready(function () {
      $("#show_hide_password button").on("click", function (event) {
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

    $(document).ready(function () {
      $("#show_hide_password-re button").on("click", function (event) {
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
    this.chechUser();
    this.getlist();
    this.getprodlist();
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

  alert_message = "";
  viewMsg_success = false;
  viewMsg_fail = false;

  medtest() {
    this.apiService
      .medreg(this.name, this.mob, this.email, this.pass)
      .subscribe(response => {
        if (response["message"] === "success") {
          this.alert_message = "Registration Success";
          this.viewMsg_success = true;
          setTimeout(() => {
            this.viewMsg_success = false;
          }, 3500);
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

  medlog() {
    this.apiService.medlogin(this.logname, this.logpass).subscribe(response => {
      if (response["message"] === "success") {
        sessionStorage.setItem("user", response["token"]);
        sessionStorage.setItem("username", response["data"]);
        this.username = response["data"];
        this.loggedin = true;
        $("#login-modal").modal("hide");
      }
    });
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
    }
    else if (this.newpass === "" || this.newrepass === "" || this.oldpass === "") {
      this.dispmssg = "empty input fields";
    }
    else {
      this.dispmssg = "Passwords doesnot match";
    }
  }
}
