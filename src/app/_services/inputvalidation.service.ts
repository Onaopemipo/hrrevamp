import { Injectable } from '@angular/core';
import { DecimalPipe} from '@angular/common';
import { Subject } from 'rxjs';
@Injectable()
export class InputvalidationService {
  amountChanged = new Subject<any>()
  invalidAccount: boolean = false;
  invalidAmount: boolean = false;
  constructor(  
    private dPipe: DecimalPipe) { }
  getCurrency(amount: number) {
    var divamnt = (amount/100)
  //  console.log(amount)
    this.amountChanged.next(this.dPipe.transform(divamnt,'.2'))
    return this.dPipe.transform(divamnt,'.2');
  }

  async validate(event,fieldelement){
    var inputentry =  event.target.value;

    var reg = new RegExp('^[-,-.0-9]+$');
    //console.log(reg.test(inputentry));
    if(inputentry && reg.test(inputentry) ){
      this.invalidAccount = false;
      this.invalidAmount = false;
      if(fieldelement == "accountNumber"){
        if(inputentry.length != 10){
          this.invalidAccount = true;
          return true;
        }else{
          this.invalidAccount = false;
          return false;
        }
        
        }
        if(fieldelement == "amount" ){
          var amt = inputentry.replace(/,/g, "");
          var newamt = amt.replace('.', "");
          event.target.value = this.getCurrency(newamt);

          return true;
        }
    }else{
      if(event.key == "Backspace" || event.key == "Delete" || event.key == "ArrowLeft" || event.key == "ArrowRight"){

      }else{     
        
        event.target.value = inputentry.slice(0,-1);

        return false;

      }
     
  }
}
}
