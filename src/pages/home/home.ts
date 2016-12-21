import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {ElpaisService} from '../../providers/elpais';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  resCheckNumero: string;
  decimo;
  premiado: boolean=false;
  premio: number=0;
  estadoSorteo: number=0;
  mensajeEstado: string = "";
  fecha: Date;
  error: number = 1;
  

  constructor(public navCtrl: NavController, public elpais: ElpaisService) {
    this.decimo = {};
  }

  consulta(){
    let numero: number;
    let respuesta: any;
    console.log(this.decimo);
    
    this.elpais.consulta(this.decimo.numero,false).then(
      a=>{
        console.log(a);
        if(a['error']==0){
          this.error = a['error'];
          console.log('Respuesta sin errores. Seteamos variables');
          if(a['premio']>0){
            this.premiado=true;
            this.premio = a['premio'];
          }
          
          this.estadoSorteo=a['status'];
          this.mensajeEstado = this.elpais.mensajeEstado(this.estadoSorteo);
          this.fecha = new Date(a['timestamp']);
        } else {
          console.log("Error al consultar tu número.");
        }
      },
      error=>{
        console.log(error);
      }
    );
    
    // this.elpais.consultaNumero(this.decimo.numero).then(
    //   (data)=>{
    //     console.log(data);
    //   },
    //   (err)=>{
    //     console.log(err);
    //   }
    // );
  }


}
