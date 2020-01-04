import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-paymode',
  templateUrl: './paymode.component.html',
  styleUrls: ['./paymode.component.css']
})
export class PaymodeComponent implements OnInit {
 
  

  constructor(private router: Router,
    private changeDetectorRef: ChangeDetectorRef) {
      // this.changeDetectorRef.detectChanges();
     }
     public count=4;


  ngOnInit() {
    this.count=9;
    this.reduce(this.count);
  }


  reduce(val){
    console.log("called");
    if(val>=1){
      setTimeout(()=>{
        this.count = val - 1;
        this.reduce(this.count);
      },1000)
    } else if(val < 1){
      this.router.navigate(["/"]);
    }
    
  }

}
