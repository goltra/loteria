import { Component } from '@angular/core';

import { NavController,Platform } from 'ionic-angular';
import {ElpaisService} from '../../providers/elpais';
declare var AdMob: any;
declare var cordova: any;
  
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
  hora: String="";
  error: number = 1;
  ultimoNumeroComprobado="";
  private admobId: any;
  private platform: Platform;

  

  constructor(public navCtrl: NavController, public elpais: ElpaisService, platform: Platform) {
    this.decimo = {};
    this.platform=platform;

    //seteo ids para anuncios según plataforma
    if(/(android)/i.test(navigator.userAgent)) {
        this.admobId = {
            banner: 'ca-app-pub-2437670687236295/2304256674',
            //interstitial: 'ca-app-pub-jjj/kkk'
        };
      } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
        this.admobId = {
            banner: 'ca-app-pub-2437670687236295/6734456277',
        };
      }
  }
  ionViewDidLoad(){
    console.log(navigator.userAgent);
     if(/(ipod|iphone|ipad|android)/i.test(navigator.userAgent)){
				this.platform.ready().then(()=>{
					 console.log('Platform ready');
					 console.log(this.platform);
					 this.createBanner();
					 });
		  }
  }
  createBanner() {
		  // console.log("Connection " + this.online.toString() + ". No creo el banner"); 
		  this.platform.ready().then(() => {
				if(AdMob) {
				  console.log("Creo el banner"); 
				  console.log('AdMob disponible');
					 AdMob.createBanner({
						  adId: this.admobId.banner,
						  autoShow: true,
						  position: AdMob.AD_POSITION.BOTTOM_CENTER
					 });
				}
		  });
	 }
  consulta(){
    let numero: number;
    let respuesta: any;
    console.log(this.decimo);
    
    this.elpais.consulta(this.decimo.numero,false).then(
      a=>{
        console.log(a);
        this.ultimoNumeroComprobado = "Último número comprobado " + this.decimo.numero.toString();
        if(a['error']==0){
          this.error = a['error'];
          console.log('Respuesta sin errores. Seteamos variables');
          
          //a['premio']=10;
          if(a['premio']>0){
            this.premiado=true;
            this.premio = a['premio'];
          }
          
          this.estadoSorteo=a['status'];
          this.mensajeEstado = this.elpais.mensajeEstado(this.estadoSorteo);
          console.log("seteo fecha con valor " +  a['timestamp'] );
          this.fecha = new Date(a['timestamp']*1000);
          if(this.fecha!=null){
            this.hora = this.fecha.getHours().toString() + ":" + this.fecha.getMinutes().toString();
          }
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
