import { Component, OnInit, Input } from '@angular/core';
import * as configcat from "configcat-js";
import { IConfigCatClient,User} from 'configcat-common';
import { AppService } from '../app.service';


@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  constructor(public appserv:AppService) {
      
    let logger = configcat.createConsoleLogger(3);

      this.configCatClient = configcat.createClientWithAutoPoll("LdzZCCN56U6PFl6vJYdaPw/wRoTEKKGK0O-557Cnm5OxA", { // <-- This is the actual SDK Key for your Production environment
          pollIntervalSeconds: 30,
          logger: logger
});


   }

  ngOnInit() {
    this.getAllValues();
    this.getTenorStatus();
    this.getAskPaymentStatus();
    this.getAskMultiPaymentStatus();
  }

  

  public configCatClient: IConfigCatClient;

  public isTenorEnabled:boolean=undefined;
  public isAskPaymentEnabled:boolean=undefined;
  public isAskMultiPaymentEnabled:boolean=undefined;

  
    
  getAllValues(){
    this.configCatClient.getAllValues(function (keys){
      console.log(keys);
    });
  }

  getTenorStatus(){
    this.configCatClient.getValueAsync("isTenorEnabled",  false)
      .then( value => {
        console.log("isTenorEnabled: " + value);
          this.isTenorEnabled=value
    });
  }
  getAskPaymentStatus(){
    this.configCatClient.getValueAsync("isAskPaymentEnabled",  false)
      .then( value => {
        console.log("isAskPaymentEnabled: " + value);
          this.isAskPaymentEnabled=value
    });
  }

  getAskMultiPaymentStatus(){
    var userObject={
      identifier:"SOMEID",
      email:"eduardo.millan96@gmail.com",
      country:"Panama",
      custom:{
        "Type":"P"
      }
    };
    this.configCatClient.getValueAsync("isAskMultiPaymentEnabled",  false, userObject)
      .then( value => {
        console.log("isAskMultiPaymentEnabled: " + value);
          this.isAskMultiPaymentEnabled=value
    });
  }

  changeFeatureStatus(feature){
    console.log(this.isTenorEnabled);
    console.log(feature)
    this.appserv.setFeatureStatus(feature,this.isTenorEnabled);

  }

}
