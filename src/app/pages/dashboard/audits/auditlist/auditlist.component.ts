import { Component, OnInit, OnDestroy } from '@angular/core';
import { FunctionService } from 'src/app/core/function.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-auditlist',
  templateUrl: './auditlist.component.html',
  styleUrls: ['./auditlist.component.scss'],
})
export class AuditlistComponent implements OnInit, OnDestroy {
  
  ngOnDestroy(): void {
    this.screenEvent.unsubscribe();
  }

  screenEvent; 

  isLandScape:Boolean;
  data;
  temp = [];

  constructor(
    private func:FunctionService,
    private plat:Platform,
  ) { }

  // ========================== FILTER 
  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter((o)=>{
      return ['user', 'tipe_audit', 'nilai_lama', 'nilai_baru', 'created_at'].some(
        (k)=>{
          return o[k].toString().toLowerCase().indexOf(val) !== -1 || !val;
        }
      );
    });

    // update the rows
    this.data = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }

  ngOnInit() {
    this.screenEvent = this.func.landscape.subscribe(
      resp=>{
        this.isLandScape = resp;
      }
    )
    
    this.reinit();
  }

  async reinit(){
    this.func.landscape.next(this.plat.isLandscape());
    await this.LoadData();
    // await this.func.delay(1000);
    this.temp = [...this.data];
  }

  async LoadData(){
    
    await this.func.getDataWithoutParams('auditshowall').toPromise().then(
      resp => {
        if (resp['success']){
          this.data = resp['data'];
          this.data.forEach(element => {
            if (element.nilai_lama != '') element.nilai_lama = JSON.parse(element.nilai_lama);
            if (element.nilai_baru != '') element.nilai_baru = JSON.parse(element.nilai_baru);
          });
        }
      }
    );
  }


}
