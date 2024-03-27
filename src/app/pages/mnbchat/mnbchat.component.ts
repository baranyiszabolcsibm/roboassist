import { Component } from '@angular/core';
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
  valueContent: string ='&#x1F601 P\u00c9TER\ud83d\udc6e:';
  extractedDataJson:any;
  tabs: TabConfig[] | undefined;
  questionText="Kérem a feljelentő nevét és telefonszámát";
  answerText = "";
  collections = ["1", "2", "3", "pelda-akta"];
  collectionListDS = this.collections;
  selectedCollection="pelda-akta"
  pdfUrl :SafeResourceUrl;
  chathistory: ChatItem[] = [];


  constructor(private http: HttpClient,private sanitizer: DomSanitizer) {
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl('../../../assets/Példa_akta.pdf#page=5'); 
    const newChatItem =  {name:"Peter",value:"Kérem a feljelentő nevét és telefonszámát"}
    this.chathistory.push(newChatItem);
    
  }
  
  public askQuestion(endpoint:string){
    let headers = new Headers();
    let chaturl = 'http://127.0.0.1:5000/bmapi/aktakerdes';
    headers.append('Content-Type', 'application/json');
    let queryparams = new HttpParams().set("collection", this.selectedCollection)
    .append("question", this.questionText);    //Create new HttpParams  .set("paramName2", paramValue2)
   
    this.http.get(chaturl,{ params:queryparams, responseType: 'text' })   //, 
    .subscribe({
      next: res => {
        console.log(res);
        var regex = /{{(\d+)}}/;
        var pageno = res.match(regex)
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl('../../../assets/Példa_akta.pdf#page='+pageno); 
        this.valueContent =  res;  //.substring(res.indexOf("{{") ,res.length);
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
