import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';

import 'rxjs/add/operator/map';

/*
  Generated class for the Elpais provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
const urlApi: string = "http://goltratec.com/loteria/api.php"

@Injectable()
export class ElpaisService {
  
  
  constructor(public http: Http) {
    console.log('Hello Elpais Provider');
  }
  consultaNumero(numero: number){
  
    let response;
    let header= new Headers();
        header.append('Accept','application/json');
        header.append('Content-Type','text/plain');

     //return this.http.get(urlApi + '?n=' + numero,{headers:header}).map(res=>response=res.json());
     return new Promise((resolve)=>{
       console.log('promise');
       this.http.get(urlApi + '?numero=' + numero,{headers:header})
       .map(res=>
          response=res.json()
        ).subscribe(data=>resolve(data));
        resolve(response);
     })
    
    // return new Promise((resolve,reject)=>{
      
    //   if(!isNaN(Number(numero))){
    //     let header= new Headers();
    //     header.append('Accept','application/json');
    //     header.append('Content-Type','text/plain');

    //     this.http.get(urlApi + '?n=' + numero,{"headers": header})
    //     .map(res => res.json())
    //     .subscribe(data=>{
    //       console.log(data);
    //       resolve(data);
    //     });
    //   } else {
    //     reject("Error, el número no es correcto y no se puede comprobar.");
    //   }

    // });
  }
}
