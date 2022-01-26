import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { computeStackId } from '@ionic/angular/directives/navigation/stack-utils';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor( private http:HttpClient) { }

 
   url='https://api.configcat.com/v1/settings/';
    
    options = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Basic MDhkOWUwMzMtMzZiYS00Yzk2LTg3MjctYWRkYWVjZGFmNmZiOnE3UllWZmVrRm1hOG5DZEYwT0dxTUt1M0hPNVBrMCtRYXpRTExlNW9XSlE9',
      'X-CONFIGCAT-SDKKEY':'LdzZCCN56U6PFl6vJYdaPw/wRoTEKKGK0O-557Cnm5OxA'
    })
  };

    setFeatureStatus(feature:string,status:boolean){

     var data = JSON.stringify({
       "value": status
     });
      return this.http.put(this.url+feature+'/value',data,this.options).subscribe(data=>{
        console.log(data);
      })
    }


}
