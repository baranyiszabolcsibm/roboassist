import { Component } from '@angular/core';
import { HttpClient,  HttpParams  }  from '@angular/common/http';
import 'devextreme/data/odata/store';
import { DxHtmlEditorModule, DxCheckBoxModule, DxSelectBoxModule, DxProgressBarComponent,DxDropDownBoxModule, DxListModule } from 'devextreme-angular';
import { DxDataGridModule } from 'devextreme-angular';
import { Service, TabConfig } from './chat.service';



@Component({
  templateUrl: 'chat.component.html',
  styleUrls: [ 'chat.component.scss' ],
  providers: [Service]
})

export class ChatComponent {
  valueContent: string ='&#x1F601 P\u00c9TER\ud83d\udc6e: A dokumentumok alapj\u00e1n a feljelent\u0151 neve Imre P\u00e9ter. Sajnos a dokumentumokban nem tal\u00e1lhat\u00f3 meg a feljelent\u0151 telefonsz\u00e1ma.';
  extractedDataJson:any;
  tabs: TabConfig[] | undefined;
  questionText="Kérem a feljelentő nevét és telefonszámát";
  answerText = "";
  collections = ["1", "2", "3", "pelda-akta"];
  collectionListDS = this.collections;
  selectedCollection="pelda-akta"
  constructor(private http: HttpClient,service: Service) {
 

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
        this.valueContent =  res ;
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
