import { Injectable, NgZone, isDevMode } from '@angular/core';
import {Location} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController, LoadingController, Platform } from '@ionic/angular';
import { Subject } from 'rxjs';
// import * as XLJS from 'exceljs';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})

export class FunctionService {

  // ================================================ HTTP SEND REQUEST SETTING ================================================
  public api_token = (localStorage.getItem('api_token') == null) ? "" : localStorage.getItem('api_token');
  // public url:string = "http://gudang.com/data/api/"; // for development use this
  // public url:string = window.location.origin+"/data/api/"; // for production enable this
  public url:string = isDevMode() ? "http://gudang.com/data/api/" : window.location.origin+"/data/api/";
  public dtHeaders = {
    'Authorization':'apl '+this.api_token,
    'Content-Type':'application/json'
  }
  // ================================================ END OF HTTP SEND REQUEST SETTING ================================================

  // ============================================= SHARED VARIABLE
  public TransferSPP:any = (localStorage.getItem('tspp') == null) ? "" : JSON.parse(localStorage.getItem('tspp'));
  public TransferDataBrgMsk:any = (localStorage.getItem('tdatamsk') == null) ? "" : JSON.parse(localStorage.getItem('tdatamsk'));
  public TransferDataBrgKlr:any = (localStorage.getItem('tdataklr') == null) ? "" : JSON.parse(localStorage.getItem('tdataklr'));
  public user = (localStorage.getItem('username') == null) ? "" : localStorage.getItem('username');
  public landscape = new Subject<Boolean>();
  public widths = Math.round(this.plat.width() / 2);
  public sspInfo:any = (localStorage.getItem('sspinfo') == null) ? "" : JSON.parse(localStorage.getItem('sspinfo'));
  public brgKeluarInfo:any = (localStorage.getItem('brgkeluarinfo') == null) ? "" : JSON.parse(localStorage.getItem('brgkeluarinfo'));
  public brgMasukInfo:any = (localStorage.getItem('brgmasukinfo') == null) ? "" : JSON.parse(localStorage.getItem('brgmasukinfo'));
  public brgSelected:any = (localStorage.getItem('brgselected') == null) ? "" : JSON.parse(localStorage.getItem('brgselected'));
  public noOrderSelected:any = (localStorage.getItem('noorder') == null) ? "" : JSON.parse(localStorage.getItem('noorder'));
  public KodePkrSelected:any = (localStorage.getItem('kodepkr') == null) ? "" : JSON.parse(localStorage.getItem('kodepkr'));
  // ============================================= END OF SHARED VARIABLE
  
  constructor(
    public plat: Platform,
    private ngZone: NgZone,
    private http: HttpClient, 
    private router:Router,
    private toast:ToastController,
    public loading: LoadingController,
    private location: Location
  ) {
    window.onresize = (e) => {
        //ngZone.run will help to run change detection
        this.ngZone.run(() => {
            this.landscape.next(this.plat.isLandscape());
        });
    };
  }

  public backClicked() {
    this.location.back();
  }

  // ============================ EXCELJS ============================
  /*
  public customReportBrgMasuk(){

    const test = ['A', 'B'];
    var filename:string = "Barang Masuk";
    let workbook = new XLJS.Workbook();
    let worksheet = workbook.addWorksheet('Barang Masuk');

    // ============== Set Width Column
    worksheet.getColumn('A').width = 4.3; worksheet.getColumn('B').width = 28.8;
    worksheet.getColumn('C').width = 14.57; worksheet.getColumn('D').width = 8.86;
    worksheet.getColumn('E').width = 8.43; worksheet.getColumn('F').width = 8.43;
    worksheet.getColumn('G').width = 8.6; worksheet.getColumn('H').width = 1.2;
    worksheet.getColumn('I').width = 16;

    // ================================ HEADER

    // =============== Border & Title
    worksheet.getCell('A1').border = {
      top: {style:'thin'},
      left: {style:'thin'},
      bottom: {style:'thin'},
    };
    worksheet.getCell('C1').border = {
      top: {style:'thin'},
      right: {style:'thin'},
      bottom: {style:'thin'},
    };

    for (var i = 1; i<=4; i++){
      if (i==1){
        worksheet.getCell('G'+i).border = {
          top: {style:'thin'},
          left: {style:'thin'},
        };
        worksheet.getCell('H'+i).border = {
          top: {style:'thin'},
        };
        worksheet.getCell('I'+i).border = {
          top: {style:'thin'},
          right: {style:'thin'},
        };
      } else{
        worksheet.getCell('G'+i).border = {
          left: {style:'thin'},
        };
        worksheet.getCell('I'+i).border = {
          right: {style:'thin'},
        };
      }
    }
    for (var i = 5; i<7; i++){
      worksheet.getCell('A'+i).border = {
        top: {style:'thin'},
        right: {style:'thin'},
        left: {style:'thin'},
      };
      if (i==6){
        worksheet.getCell('B7').border = {
          right: {style:'thin'},
        };
        worksheet.getCell('G8').border = {
          right: {style:'thin'},
        };
        worksheet.getCell('A9').border = {
          left: {style:'thin'},
        };
        worksheet.getCell('I9').border = {
          right: {style:'thin'},
        };
      }
    }
    
    // ============== MERGING CELLS
    worksheet.mergeCells('A1:B4');
    worksheet.mergeCells('C1:F4');
    worksheet.mergeCells('A5:I5');
    worksheet.mergeCells('A6:I6');
    worksheet.mergeCells('B7:I7');
    worksheet.mergeCells('B8:F8');
    worksheet.mergeCells('G8:I8');
    worksheet.mergeCells('F10:G10');
    worksheet.mergeCells('A10:A11');
    worksheet.mergeCells('B10:B11');
    worksheet.mergeCells('C10:C11');
    worksheet.mergeCells('D10:D11');
    worksheet.mergeCells('E10:E11');
    worksheet.mergeCells('H10:I11');

    // ============ LOGO
    var imageId1 = workbook.addImage({
      base64: logo,
      extension: 'jpeg',
    });
    worksheet.addImage(imageId1, {
        tl: { col: 0.2, row: 0.2 },
        br: { col: 2, row: 3.9 }
      }
    );

    // ================================ END HEADER

    // ============ SAVE AS EXCEL
    this.saveExcel(workbook, filename);
  }

  public exportGeneral(FileName:string){

    let workbook = new XLJS.Workbook();
    let worksheet = workbook.addWorksheet('Car Data');
    var imageId1 = workbook.addImage({
      base64: logo,
      extension: 'jpeg',
    });
    worksheet.addImage(imageId1, 'A3:B5');
    worksheet.addRow(["tes column A1", "tes column A2"]);
    worksheet.addRow(["tes column B1", "tes column B2"]);
    worksheet.mergeCells('D1:D2');
    this.saveExcel(workbook, FileName);
  }

  private saveExcel(wb, FileName){
    wb.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: EXCEL_TYPE });
      FileSaver.saveAs(blob, FileName + EXCEL_EXTENSION);
    });
  }
  */
  // ============================ EXCELJS ============================


  // ========================================== EXCEL EXPORT ========================================== DEPRECATED

  public tableToExcel(table, excelFileName: string){
    
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
    // console.log('worksheet',worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }


  public exportAsExcelFile(json: any[], excelFileName: string): void {
    
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    // console.log('worksheet',worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  public customExportBarangMasuk(){

    var workbook: XLSX.WorkBook = XLSX.utils.book_new();
    workbook.Props = {
      Title: "Custom Export",
      Subject: "Test",
      Author: "Armand",
      CreatedDate: new Date()
    }
    workbook.SheetNames.push("Test Sheet"); // Sheet Name
    var worksheet = workbook.Sheets[workbook.SheetNames[0]];

    worksheet = XLSX.utils.aoa_to_sheet([['']]);
    // worksheet["!merges"] = [{s:{r:0,c:0},e:{r:0,c:1}}]
    worksheet = XLSX.utils.sheet_add_aoa(worksheet, [
      ["new data", 1, 2, 3]
    ]); //add this {origin: -1} to insert 1 record below after add new data
    
    workbook.Sheets["Test Sheet"] = worksheet; // Insert Data to sheet

    // ================ SAVE PROCEDURE
    var wbout = XLSX.write(workbook, {bookType:'xlsx',  type: 'array'});
    this.saveAsExcelFile(wbout, "Test");
  }

  public saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }
  // ========================================== EXCEL EXPORT ========================================== DEPRECATED  

  // ============ For Auditting
  public Audits(auditType:string, newValue:string, oldValue:string){

    var json = {
      user:this.user,
      tipe_audit:auditType,
      nilai_lama: oldValue,
      nilai_baru: newValue
    }

    return this.postData(json, 'auditinsert').toPromise();
  }

  // =========================== TOAST 
  public async presentToast(msg:string, txtpos:string, clr?:string, dur?: number) {
    
    dur = (dur) ? dur : 2000;

    const toast = await this.toast.create({
      cssClass:txtpos,
      color: clr,
      position: 'bottom',
      message: msg,
      duration: dur
    });
    toast.present();
  }

  // ===================== POST
  public postData(data, path:string){
    return this.http.post(this.url+path, data, {headers:this.dtHeaders});
  }

  // ================ ONLY GET
  public getDataWithoutParams(path:string){ 
    return this.http.get(this.url+path, {headers:this.dtHeaders});
  }

  // =============== GET + PARAMS
  public getDataWithParams(params:string, path:string){
    return this.http.get(this.url+path+params, {headers:this.dtHeaders});
  }

  // ============ DELAY
  public delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  // ====================== CHECK LOGIN
  public async checkLogin(token){
    
    if (token == ""){
      this.router.navigateByUrl('/login');
    } 

    var data = {
      api_token:token
    };
    
    await this.postData(data, 'checklogin').toPromise().then(
      respond => {      
        if(respond['success']){
          this.api_token = respond['data']['api_token'];
          this.user = respond['data']['username'];
          localStorage.setItem('api_token', this.api_token);
          localStorage.setItem('username', this.user);
        }
        
      },
      err=>{
        if (err.status == 401){
          this.presentToast('Anda tidak berhak melihat data', 'text-center', 'danger', 5000);
          this.router.navigateByUrl('/login');
        } else {
          this.presentToast('Tidak dapat terhubung ke server', 'text-center', 'danger', 5000);
        }
        localStorage.clear();
      }
    )

  }

  // ================= LOADING
  public async presentLoadingWithOptions() {
    const loading = await this.loading.create({
      spinner: "crescent",
      duration: 1000,
      message: 'Mohon tunggu...',
      translucent: true,
      cssClass: 'text-center'
    });
    return await loading.present();
  }
  
  // ================== Mengubah angka menjadi kalimat
  public terbilang(bilangan:any) {

    bilangan    = String(bilangan);
    var angka   = new Array('0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0');
    var kata    = new Array('','Satu','Dua','Tiga','Empat','Lima','Enam','Tujuh','Delapan','Sembilan');
    var tingkat = new Array('','Ribu','Juta','Milyar','Triliun');
   
    var panjang_bilangan = bilangan.length;
   
    if (bilangan == "0"){
      var kaLimat = "Nol";
      return kaLimat;
    }

    /* pengujian panjang bilangan */
    if (panjang_bilangan > 15) {
      var kaLimat = "Diluar Batas";
      return kaLimat;
    }
   
    /* mengambil angka-angka yang ada dalam bilangan, dimasukkan ke dalam array */
    for (var i = 1; i <= panjang_bilangan; i++) {
      angka[i] = bilangan.substr(-(i),1);
    }
   
    i = 1;
    var j = 0;
    kaLimat = "";
   
   
    /* mulai proses iterasi terhadap array angka */
    while (i <= panjang_bilangan) {
   
      var subkaLimat = "";
      var kata1 = "";
      var kata2 = "";
      var kata3 = "";
   
      /* untuk Ratusan */
      if (angka[i+2] != "0") {
        if (angka[i+2] == "1") {
          kata1 = "Seratus";
        } else {
          kata1 = kata[angka[i+2]] + " Ratus";
        }
      }
   
      /* untuk Puluhan atau Belasan */
      if (angka[i+1] != "0") {
        if (angka[i+1] == "1") {
          if (angka[i] == "0") {
            kata2 = "Sepuluh";
          } else if (angka[i] == "1") {
            kata2 = "Sebelas";
          } else {
            kata2 = kata[angka[i]] + " Belas";
          }
        } else {
          kata2 = kata[angka[i+1]] + " Puluh";
        }
      }
   
      /* untuk Satuan */
      if (angka[i] != "0") {
        if (angka[i+1] != "1") {
          kata3 = kata[angka[i]];
        }
      }
   
      /* pengujian angka apakah tidak nol semua, lalu ditambahkan tingkat */
      if ((angka[i] != "0") || (angka[i+1] != "0") || (angka[i+2] != "0")) {
        subkaLimat = kata1+" "+kata2+" "+kata3+" "+tingkat[j]+" ";
      }
   
      /* gabungkan variabe sub kaLimat (untuk Satu blok 3 angka) ke variabel kaLimat */
      kaLimat = subkaLimat + kaLimat;
      i = i + 3;
      j = j + 1;
   
    }
   
    /* mengganti Satu Ribu jadi Seribu jika diperlukan */
    if ((angka[5] == "0") && (angka[6] == "0")) {
      kaLimat = kaLimat.replace("Satu Ribu","Seribu");
    }
   
    return kaLimat //+ "Rupiah";
   }

}
