import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {ElpaisService} from '../../providers/elpais';

@Component({
  selector: 'page-resumen',
  templateUrl: 'resumen.html'
})
export class ResumenPage {
  numero=[];
  
  horaActualizacion: any;
  estado: number=0;
  mensajeEstado: string="";
  error:number = 1;
  listaPdf:string = "";
  urlAudio: string="";

  constructor(public navCtrl: NavController,public elpais: ElpaisService) {

  }
  consultaResumen(){
    this.elpais.consulta(null,true).then(
      data=>{
        this.numero[1] = data['numero1'];
        this.numero[2] = data['numero2'];
        this.numero[3] = data['numero3'];
        this.numero[4] = data['numero4'];
        this.numero[5] = data['numero5'];
        this.numero[6] = data['numero6'];
        this.numero[7] = data['numero7'];
        this.numero[8] = data['numero8'];
        this.numero[9] = data['numero9'];
        this.numero[10] = data['numero10'];
        this.numero[11] = data['numero11'];
        this.numero[12] = data['numero12'];
        this.numero[13] = data['numero13'];

        this.estado = data['status'];
        this.mensajeEstado = this.elpais.mensajeEstado(this.estado);
        this.error=data['error'];
        this.listaPdf = data['listaPDF'];
        this.urlAudio=data['urlAudio'];

      }
    );

  }
}
