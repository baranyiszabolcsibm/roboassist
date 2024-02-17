// generate component  ng generate component vallomas
import { Component } from '@angular/core';
import { Service } from './vallomas.service';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType ,HttpHeaders, HttpParams }  from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
//import { of } from 'rxjs';
//import { catchError, map } from 'rxjs/operators';

@Component({
  templateUrl: 'vallomas.component.html',
  styleUrls: [ './vallomas.component.scss' ],
  providers: [Service]
})
export class VallomasComponent {
  pdfUrl: SafeResourceUrl;
  pdfUploadUrl='http://localhost:5000/bmapi/uploadPdf';// SafeResourceUrl;
  pdfextractMetaUrl: SafeResourceUrl;
  // adam backendje backendUrl='http://91.107.238.245:8080/'
  progress:number=0;
  backendUrl="http://localhost:5000/bmapi/";

  // Domsanitizer kell hogy egyújabb secu fasságot NG0904: unsafe value used in a resource URL context áthidaljak 
  constructor(private service: Service,  private http: HttpClient,private sanitizer: DomSanitizer) {
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:5000/bmapi/getPdf');   //local drivreól valami

    //this.pdfUploadUrl= this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:5000/bmapi/uploadPdf');  //getPDF
    this.pdfextractMetaUrl = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:5000/bmapi/getPdf');
    //this.pdfUploadUrl = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:5000/bmapi/getPdf');
    //this.pdfUploadUrl = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:5000/bmapi/getPdf');

  }


  handleValueChange(e:any)
  {
    var v=123;
    switch(this.progress){
      case 30:
        var z= 30;
        //this.templatechange('feljelentes');
        break;
      case 50:
        var z=30;
        //this.templatechange('nyomozas');
        break;
    }
  }

                /*
  sendFile(file:any) {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    this.service.sendFormData(formData).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          console.log(event.body);
        }
      });
  }
*/

//single file  nem multipart basz
onFileSelected(event: any) {
  const file: File = event.target.files[0];
  const filename: string = file.name;

  this.service.uploadPdf(filename, file).subscribe({
    next: res => {
      var z= res;
      console.log(res);
    },
    error: error => {
      var ez= error;
      console.log('Error :',error);
    },
    complete: () => {     // anonym
      console.log('Request complete');
    }
  });
}


extractPdf(file: File) {
  var filename= file.name;
  const url = this.backendUrl+'extract-pdf/'+filename;
  const formData = new FormData();
  formData.append('file', file, file.name);
  const headers = new HttpHeaders({
    'accept': 'application/json',
    'Content-Type': 'multipart/form-data'
  });
  return this.http.post(url, formData, { headers });
}

public callReset() {

    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    });
    //formData.append('userid', JSON.stringify(this.commonUserData.currentId));
    var serverUrl="http://91.107.238.245:8080/";
    this.http.post(serverUrl+'reset/',  { headers })
    .subscribe({
      next: res => {
        var z= res;
        console.log(res);
      },
      error: error => {
        var ez= error;
      },
      complete: () => {     // anonym
        console.log('Request complete');
      }
    });
  }

  public processDoc(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //let params = new URLSearchParams();
    //    params.append("filename", 'c:\\tmp\\1.pdf')

    let queryparams = new HttpParams().set("filename", 'c:\\tmp\\1.pdf'); //Create new HttpParams  .set("paramName2", paramValue2)

    this.http.get('http://127.0.0.1:5000/bmapi/extractPdf', { params:queryparams })
    .subscribe({
      next: res => {
        var z= res;
        console.log(res);
      },
      error: error => {
        var ez= error;
      },
      complete: () => {     // anonym
        console.log('Request complete');
      }
    });
    
    
    ;
  }

  public uploadFileToAIServer(files:any) {

    var selectedFile = files.target.files[0] as File;

    //for (var i = 0; i < files.length; i++) {

      let fileToUpload =  selectedFile;  // <File>files[i];
      const formData = new FormData();
      formData.append('file', fileToUpload, 'bszprefix_'+fileToUpload.name);
      // const headers = new HttpHeaders({
      //   'accept': 'application/json',
      //   'Content-Type': 'multipart/form-data'
      // });
      //formData.append('userid', JSON.stringify(this.commonUserData.currentId));
      this.http.post(this.pdfUploadUrl, formData)     // ,{ headers }
      .subscribe({
        next: res => {
          var z= res;
          console.log(res);
        },
        error: error => {
          var ez= error;
          console.log(error);
        },
        complete: () => {     // anonym
          console.log('Request complete');
        }
      });
   // }

  }

}
