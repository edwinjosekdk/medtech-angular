import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class DataService {
  private phoneSource = new BehaviorSubject("");
  currentNumber = this.phoneSource.asObservable();

  constructor() {}

  changePhone(phone: string) {
    this.phoneSource.next(phone);
  }
}
