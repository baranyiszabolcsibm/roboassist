
// generate service   ng generate service vallomas
import { Injectable } from '@angular/core';
//mport * as AspNetData from 'devextreme-aspnet-data-nojquery';
import { HttpClient  }  from  '@angular/common/http';
import {  Observable }  from  'rxjs';

import { Component } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';


/* export class ProcTab {
  text: string | undefined;
  id: number | undefined;
}
 */

@Injectable()
export class Service {
    serverUrl:string="http://127.0.0.1:5000/bmapi";
    apiUrl:string=this.serverUrl;
    

    constructor( private http: HttpClient) {
      }

  genetratePdf(htmltxt:any){

    // Load HTML document
  

    html2canvas(htmltxt).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/jpeg', 1.0)
      console.log(contentDataURL);  
      let pdf = new jsPDF('l', 'cm', 'a4'); //Generates PDF in landscape mode
      // let pdf = new jspdf('p', 'cm', 'a4'); //Generates PDF in portrait mode
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);  
      pdf.save('bsz4a.pdf');   
    }); 
    // Default export is a4 paper, portrait, using millimeters for units
    //const doc = new jsPDF();
    
    //doc.text("Hello world!", 10, 10);
    //doc.text(htmltxt, 10, 10);
    //doc.save("bsza4.pdf");
  }

/*     getProcessTab():ProcTab[]{
        return this.processStepsDS;
      } */

  uploadPdf(filename: string, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, filename);

    return this.http.post<any>(this.apiUrl+"/uploadPdf", formData);
  }




  public uploadFile(files:any) {
    if (files.length === 0) {
      return;
    }
    for (var i = 0; i < files.length; i++) {
      let ufile = "prefix"+ i.toString();
      let fileToUpload = <File>files[i];
      const formData = new FormData();
      formData.append('file', fileToUpload, ufile);
      //formData.append('userid', JSON.stringify(this.commonUserData.currentId));

      this.http.post('/extract-pdf', formData, { reportProgress: true })
      .subscribe({
        next: res => {
          var z= res;
          console.log(res);
        },
        error: error => this.handleUploadError(error),    //  callback
        
        complete: () => {     // anonym
          console.log('Request complete');
        }
      });
    }

  }

  public sendFormData(formData:any) {
    return this.http.post<any>(this.apiUrl, formData, {
      reportProgress: true,
      observe: 'events'
    });
    }

  public handleUploadError(error:any)
  {
    var z= error;
  }

}