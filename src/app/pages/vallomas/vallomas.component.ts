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
  actualFileToProcess="XC.pdf";
  apimessage=" ";
  pdfUrl: SafeResourceUrl;
  execsystem = "MISTRAL";


  pdfUploadUrl='http://localhost:5000/bmapi/uploadPdf';// SafeResourceUrl;
  pdfextractMetaUrl: SafeResourceUrl;
  // adam backendje backendUrl='http://91.107.238.245:8080/'
  progress:number=0;
  backendUrl="http://localhost:5000/bmapi/";

  // Domsanitizer kell hogy egyújabb secu fasságot NG0904: unsafe value used in a resource URL context áthidaljak 
  constructor(private service: Service,  private http: HttpClient,private sanitizer: DomSanitizer) {
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:5000/bmapi/getPdf/1.pdf');   //a feltöltött file visszaadva

    //this.pdfUploadUrl= this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:5000/bmapi/uploadPdf');  //getPDF
    this.pdfextractMetaUrl = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:5000/bmapi/getPdf');
    //this.pdfUploadUrl = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:5000/bmapi/getPdf');
    //this.pdfUploadUrl = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:5000/bmapi/getPdf');

  }

  public processDoc(){
    this.extractPdfMeta();

  }

  public changeExecSystem(){
    this.execsystem = this.execsystem=="MISTRAL"?"GPT4":"MISTRAL";
    this.http.get('http://127.0.0.1:5000/bmapi/switchSystem/'+ this.execsystem, { responseType: 'text' } )
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
      }});
      

  }

  handleValueChange(e:any)
  {
    switch(this.progress){
      case 20:   
        //2. lépés   /feljelentési jegyzokonyv_metadata
        this.feljelentesMeta();
        break;
      case 40:   
        //2. lépés   /feljelentési jegyzokonyv_metadata
        this.nyomozasMeta();
        break;  
      case 60:
        var z=30;
        this.statlapMeta();
        break;
      case 80:
        var z=30;
        this.btkcategoryMeta();
        
        break;
      case 90:
        var z=30;
        if (this.execsystem=="GPT4")
        {
          this.progress=100;
          break;
        }
        this.summaryMeta();
        break;
    }
  }


  extractPdfMeta(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //let params = new URLSearchParams();
    //    params.append("filename", 'c:\\tmp\\1.pdf')

    let queryparams = new HttpParams().set("filename", this.actualFileToProcess); //Create new HttpParams  .set("paramName2", paramValue2)
    this.http.get('http://127.0.0.1:5000/bmapi/extractPdf', { params:queryparams })
    .subscribe({
      next: res => {
        var z= res;
        this.apimessage = res.toString();     
        this.progress = 20;
      },
      error: error => {
        this.apimessage = error;
      },
      complete: () => {     // anonym
        console.log('Request complete  extractPdfMeta');
      }
    });
  }

  feljelentesMeta(){
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    });
    //formData.append('userid', JSON.stringify(this.commonUserData.currentId));
    var serverUrl="http://127.0.0.1:5000/bmapi/feljelent";
    this.http.post<string>(serverUrl,  { headers })
    .subscribe({
      next: res => {
        this.apimessage =  res;     
        this.progress = 40;
      },
      error: error => {
        this.apimessage = error;
      },
      complete: () => {     // anonym
        console.log('Request complete  feljelentesMeta');
      }
    });
  }

  nyomozasMeta(){
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    });
    //formData.append('userid', JSON.stringify(this.commonUserData.currentId));
    var serverUrl="http://127.0.0.1:5000/bmapi/nyomoz";
    this.http.post<string>(serverUrl,  { headers })
    .subscribe({
      next: res => {
        this.apimessage += res;     
        this.progress = 60;
      },
      error: error => {
        this.apimessage = error;
      },
      complete: () => {     // anonym
        console.log('Request complete  nyomozasMeta');
      }
    });
  }

  statlapMeta(){
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    });
    //formData.append('userid', JSON.stringify(this.commonUserData.currentId));
    var serverUrl="http://127.0.0.1:5000/bmapi/statlap";
    this.http.post<string>(serverUrl,  { headers })
    .subscribe({
      next: res => {
        this.apimessage += res;     
        this.progress = 80;
      },
      error: error => {
        this.apimessage = error;
      },
      complete: () => {     // anonym
        console.log('Request complete  statlapMeta');
      }
    });
  }


  btkcategoryMeta(){
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    });
    //formData.append('userid', JSON.stringify(this.commonUserData.currentId));
    var serverUrl="http://127.0.0.1:5000/bmapi/btkcategory";
    this.http.post<string>(serverUrl,  { headers })
    .subscribe({
      next: res => {
        this.apimessage += res;     
        this.progress = 90;
      },
      error: error => {
        this.apimessage = error;
      },
      complete: () => {     // anonym
        console.log('Request complete  btkcategoryMeta');
      }
    });
  }

  //  de ez csak 8080  nore on van
  summaryMeta(){
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    });
    //formData.append('userid', JSON.stringify(this.commonUserData.currentId));
    var serverUrl="http://127.0.0.1:5000/bmapi/summary";
    this.http.post<string>(serverUrl,  { headers })
    .subscribe({
      next: res => {
        this.apimessage += res;     
        this.progress = 100;
      },
      error: error => {
        this.apimessage = error;
      },
      complete: () => {     // anonym
        console.log('Request complete summaryMeta');
      }
    });
  }


  public uploadFileToAIServer(files:any) {

    var selectedFile = files.target.files[0] as File;

      let fileToUpload =  selectedFile;  // <File>files[i];
      const formData = new FormData();
      this.actualFileToProcess = 'bszprefix_'+fileToUpload.name;
      formData.append('file', fileToUpload,this.actualFileToProcess );
      this.http.post(this.pdfUploadUrl, formData)     // ,{ headers }
      .subscribe({
        next: res => {
          var z= res;
          this.apimessage = String(res);
          this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:5000/bmapi/getPdf/'+this.actualFileToProcess);
          this.progress = 10;
        },
        error: error => {
          var ez= error;
          this.apimessage = error;
        },
        complete: () => {     // anonym
          console.log('Request complete uploadFileToAIServer');
        }
      });
   // }

  }



/////////////  gyakorlas  ////////

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
      console.log('Request complete onFileSelected');
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