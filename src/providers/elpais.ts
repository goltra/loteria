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
  /** Devuelve una promesa con el resultado de la consulta del
   * número enviado o el resumen del sorteo. Si enviamos el número
   * y solicitamos el resumen, prevalecerá el número.
   */
  consulta(numero: number=null,resumen: boolean=false){
    let header= new Headers();
    header.append('Accept','application/json');
    header.append('Content-Type','text/plain');

    return new Promise((resolve,reject)=>{
      console.log('promise');
      if(!isNaN(Number(numero))){
        this.http.get(urlApi + '?numero=' + numero,{headers:header})
        .map(res=>res.json())
        .subscribe(data=>resolve(data));
      } else {
        reject("El número insertado no es correcto");
      }
      if(resumen){
        this.http.get(urlApi + '?n=resumen')
        .map(res=>res.json())
        .subscribe(data=>resolve(data));
      }
    });
  }
  mensajeEstado(codigoEstado: number){
     switch(codigoEstado)
          {
            case 0:
              return "el sorteo no ha comenzado aún.";

            case 1:
              return "el sorte está en marcha.";
            
            case 2:
              return "el sorteo ha finalizado,pero no se han publicado los resultado finales.";
            
            case 3:
              return "el sorteo ha terminado y ya tenemos un listado pdf.";
            
            case 4:
              return "el sorteo ha terminado y la lista ya es oficial.";
            
            default:
              return "";
          }
  }
}
