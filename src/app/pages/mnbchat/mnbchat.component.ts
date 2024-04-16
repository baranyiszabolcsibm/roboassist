import { Component ,ViewChild } from '@angular/core';
import { HttpClient,  HttpParams  }  from '@angular/common/http';
import 'devextreme/data/odata/store';
import { DxHtmlEditorModule, DxCheckBoxModule, DxSelectBoxModule, DxProgressBarComponent,DxDropDownBoxModule, DxListModule } from 'devextreme-angular';
import { DxDataGridModule } from 'devextreme-angular';
import { Service, TabConfig } from './mnbchat.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


export class ChatItem {
  name: string | undefined;
  value: string = "";
}


@Component({
  templateUrl: 'mnbchat.component.html',
  styleUrls: [ 'mnbchat.component.scss' ],
  providers: [Service]
})

export class MNBChatComponent {
  @ViewChild('pdfViewerOnDemand') pdfViewerOnDemand: any;
  valueContent: string ='Assistant:';
  extractedDataJson:any;
  tabs: TabConfig[] | undefined;
  questionText="Van-e szabályzás a projektek keretében épített ingatlanberuházást finanszírozó hitelekre intézményi oldalról";
  answerText = "";

  pdfUrl :SafeResourceUrl;
  pdfUrlStr :string = 'http://localhost:5000/mnbapi/getPdf/1.pdf';
  chathistory: ChatItem[] = [];
  pages = [1,2,3];
  selectedPage = 1;
  summarydoc = "zzz.pdf";


  constructor(private http: HttpClient,private sanitizer: DomSanitizer) {
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl('c:/temp/13.pdf'); 
    const newChatItem =  {name:"Assistant",value:"Milyen ajánlásokat készített az MNB hitelintézeti hitelvállalási kockázatok témakörben?"}
    this.chathistory.push(newChatItem);
    
  }
  
  updateCurrentPage(event: any): void {
    this.selectedPage = 1; // Update the current page
  }
  onSelectionChanged(event: any){
    this.pdfViewerOnDemand.page = this.selectedPage;
    this.pdfViewerOnDemand.refresh();

  //   this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:5000/mnbapi/getPdf/'+this.summarydoc)  
  //   this.pdfUrlStr = 'http://localhost:5000/mnbapi/getPdf/'+this.summarydoc;

  //  // +"#page="+this.selectedPage);
  //   const pdfIframe = document.getElementById('pdfIframe') as HTMLIFrameElement;
  //   if (pdfIframe) {
  //     pdfIframe.contentWindow?.location.reload();
  //   }
  }

  pdfLoaded() {
    
    this.pdfViewerOnDemand.page = this.selectedPage;
  }


  public askQuestion(endpoint:string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let queryparams = new HttpParams().set("question", this.questionText);

    var chaturl = 'http://127.0.0.1:5000/mnbapi/ragsearch';
    if (endpoint == 'OKOS'){
      chaturl = 'http://127.0.0.1:5000/mnbapi/agentcall';
      /// oksnál csak válasz van
      this.http.get(chaturl,{ params:queryparams, responseType: 'text' })   //, 
      .subscribe({
        next: (res: any) => {
          console.log(res);
          let jsonObject = JSON.parse(res);
              this.valueContent =  jsonObject.answer;  //.substring(res.indexOf("{{") ,res.length);
              // this.summarydoc = jsonObject.summarydoc;
              // this.pdfUrlStr = 'http://localhost:5000/mnbapi/getPdf/'+this.summarydoc
              // this.pdfViewerOnDemand.pdfSrc =  this.pdfUrlStr;
              // this.pdfViewerOnDemand.refresh();
        }, 
        error: error => {
          /**
           * Represents the error that occurred.
           */
          var ez= error;
        },
        complete: () => {     // anonym
          console.log('Request complete');
        }
      });
    
    
    }
    else {
      chaturl = 'http://127.0.0.1:5000/mnbapi/ragsearch';
      this.http.get(chaturl,{ params:queryparams, responseType: 'text' })   //, 
      .subscribe({
        next: (res: any) => {
          console.log(res);
          let jsonObject = JSON.parse(res);
          this.summarydoc = jsonObject.summarydoc;
          this.pages = jsonObject.pages;
          this.selectedPage = this.pages[0];
          this.pdfUrlStr = 'http://localhost:5000/mnbapi/getPdf/'+this.summarydoc
          this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfUrlStr);
          this.pdfViewerOnDemand.pdfSrc =  this.pdfUrlStr;
          this.pdfViewerOnDemand.page = this.selectedPage;
          this.pdfViewerOnDemand.refresh();
          //+"#page="+this.selectedPage
          this.valueContent =  jsonObject.answer;  //.substring(res.indexOf("{{") ,res.length);
        }, 
        error: error => {
          /**
           * Represents the error that occurred.
           */
          var ez= error;
        },
        complete: () => {     // anonym
          console.log('Request complete');
        }
      });
    
    }

   
   
        
    
    
  }



}
