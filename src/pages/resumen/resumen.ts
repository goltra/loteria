import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {ElpaisService} from '../../providers/elpais';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'page-resumen',
  templateUrl: 'resumen.html'
})
export class ResumenPage {
  numero=[];
  fecha: Date;
  horaActualizacion: String="";
  estado: number=0;
  mensajeEstado: string="";
  error:number = 1;
  listaPdf:string = "";
  urlAudio: string="";

  constructor(public navCtrl: NavController,public elpais: ElpaisService) {

  }
  ionViewDidLoad(){
    this.consultaResumen();
    Observable.interval(1000*60).subscribe(x => {
      this.consultaResumen();
    });
  }
  consultaResumen(){
    this.numero = [];  
    this.elpais.consulta(null,true).then(
      data=>{
        
        console.log("resumen");
        console.log(data);
        // this.numero.push({'numero': 12345,'texto':'lo que sea1'});
        // this.numero.push({'numero': 12342,'texto':'lo que sea2'});
        this.numero.push({'numero': data['numero1'], 'texto': "1er Premio."});
        this.numero.push({'numero': data['numero2'], 'texto': "2do Premio."});
        this.numero.push({'numero': data['numero3'], 'texto': "3er Premio."});
        this.numero.push({'numero': data['numero4'], 'texto': "1er Cuarto Premio."});
        this.numero.push({'numero': data['numero5'], 'texto': "2do Cuarto Premio."});
        this.numero.push({'numero': data['numero6'], 'texto': "1er Quinto Premio."});
        this.numero.push({'numero': data['numero7'], 'texto': "2do Quinto Premio."});
        this.numero.push({'numero': data['numero8'], 'texto': "3er Quinto Premio."});
        this.numero.push({'numero': data['numero9'], 'texto': "4to Quinto Premio."});
        this.numero.push({'numero': data['numero10'], 'texto': "5to Quinto Premio."});
        this.numero.push({'numero': data['numero11'], 'texto': "6to Quinto Premio."});
        this.numero.push({'numero': data['numero12'], 'texto': "7º Quinto Premio."});
        this.numero.push({'numero': data['numero13'], 'texto': "8 Quinto Premio."});
        console.log(this.numero);
        this.fecha = new Date(data['timestamp']*1000);
        if(this.fecha!=null){
          this.horaActualizacion = this.fecha.getHours().toString() + ":" + this.fecha.getMinutes().toString();
        }
        this.estado = data['status'];
        this.mensajeEstado = this.elpais.mensajeEstado(this.estado);
        this.error=data['error'];
        this.listaPdf = data['listaPDF'];

        this.urlAudio=data['urlAudio'];


      }
    );

  }
}
