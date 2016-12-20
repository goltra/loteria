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
  constructor(public navCtrl: NavController, public elpais: ElpaisService) {
    this.decimo = {};
  }

  consulta(){
    let numero: number;
    let respuesta: any;
    console.log(this.decimo);
    
this.elpais.consultaNumero(this.decimo.numero).then(a=>{
  console.log(a);
});
    
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
