import { Component, OnInit, OnDestroy } from '@angular/core';
import { FunctionService } from 'src/app/core/function.service';
import { EventEmitterService } from 'src/app/core/event-emitter.service';

@Component({
  selector: 'app-bengkel',
  templateUrl: './bengkel.component.html',
  styleUrls: ['./bengkel.component.scss'],
})
export class BengkelComponent implements OnInit, OnDestroy {
  
  ngOnDestroy(): void {
    this.screenEvent.unsubscribe();
    this.subsEvent.unsubscribe();
  }

  bengkelarr:Array<any>;
  bengkel:string;
  list_bengkel:Array<any>;
  landscape:Boolean;
  screenEvent;
  subsEvent;

  constructor(
    private func: FunctionService,
    private eventEmitterService:EventEmitterService
  ) { }

  ngOnInit() {
    this.landscape = this.func.plat.isLandscape();
    this.screenEvent = this.func.landscape.subscribe(
      resp=>{
        this.landscape = resp;
      }
    )
    if (this.subsEvent==undefined) {    
      this.subsEvent = this.eventEmitterService.    
      invokeFirstComponentFunction.subscribe(() => {  
        this.loadBengkel();
      });    
    }
    this.loadBengkel();
  }

  loadBengkel(){
    this.func.getDataWithoutParams('bengkeldis').toPromise().then(
      resp=>{
        if (resp['success'] && resp['data'] != null){
          this.bengkelarr = resp['data'];
        }
      }
    )
    if (this.bengkel != null) this.onChange();
  }

  onChange(){
    var jsonsend = {
      bengkel:this.bengkel
    }
    this.func.postData(jsonsend, 'bengkel').toPromise().then(
      resp=>{
        if (resp['success'] && resp['data'] != null){
          this.list_bengkel = resp['data'];
        }
      }
    )
  }

}
