import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HttpClient,  HttpParams  }  from '@angular/common/http';
import { DxHtmlEditorModule, DxCheckBoxModule, DxSelectBoxModule, DxProgressBarComponent } from 'devextreme-angular';
import { DxDataGridModule } from 'devextreme-angular';
import { Service, TabConfig } from './tasks.service';


@Component({
  templateUrl: 'tasks.component.html',
  styleUrls: [ 'tasks.component.scss' ],
  providers: [Service]
})

export class TasksComponent {
  isMultiline = true;
  valueContent: string ="0";
  currentTab: string[] | undefined;
  dataSource: any;
  extractedDataJson:any;
  tabs: TabConfig[] | undefined;
  serverUrl:string="http://91.107.238.245:8080/";
  gridview=true;
  

  constructor(private http: HttpClient,service: Service) {
 
    this.tabs = service.getTabsData();
    this.currentTab = this.tabs[2].value;


  }
  
  ngOnInit(): void {
    //template reload
    this.http.get('./assets/templates/FeljelentesMetadata.txt', { responseType: 'text' })
    .subscribe({
      next: res => {
        var z= res;
        this.valueContent =res;
      },
      error: error => {
        var ez= error;
        console.log('Error :',error);
      },
      complete: () => {     // anonym
        console.log('Request complete');
      }});
  }

  public async templatechange(templatename:string) {
    // const buttonText = e.component.option('text');

    
    this.http.get('./assets/templates/'+templatename+'.txt', { responseType: 'text' })
    .subscribe({
      next: res => {
        var z= res;
        this.valueContent =res;
        this.getDocMetadata('get'+templatename);
      },
      error: error => {
        var ez= error;
        console.log('Error :',error);
      },
      complete: () => {     // anonym
        console.log('Request complete');
      }});
      
     
    return;

   
  }

  public getDocMetadata(endpoint:string){
    let headers = new Headers();
    let baseurl = 'http://127.0.0.1:5000/bmapi/';
    headers.append('Content-Type', 'application/json');
    //let queryparams = new HttpParams().set("filename", 'c:\\tmp\\1.pdf'); //Create new HttpParams  .set("paramName2", paramValue2)
    if (endpoint == "getBtkCategory" || endpoint == "getSummary")
      { 
          this.gridview = false;
          this.http.get(baseurl+endpoint,{ responseType: 'text' })   //, { params:queryparams }
          .subscribe({
            next: res => {
              console.log(res);
              this.extractedDataJson =  res ;
            }, 
            error: error => {
              var ez= error;
            },
            complete: () => {     // anonym
              console.log('Request complete: ' + endpoint);
            }
          });
        }
        else{
          this.gridview = true;
          this.http.get(baseurl+endpoint)   //, { params:queryparams }
          .subscribe({
            next: res => {
              console.log('Request complete');
              this.extractedDataJson =  res ;
              try {
                // Parse the JSON array string into an array of objects
                const jsonArray= this.extractedDataJson;
                    // Iterate through the array and print key-value pairs
                jsonArray.forEach((item: { [key: string]: any }) => {
                  console.log("{{"+item["key"]+"}}", "Value:"+ item["value"]); 
                  const replacekulcs = "{{"+item["key"]+"}}"
                  var z= this.valueContent.replaceAll(replacekulcs,item["value"]);
                   this.valueContent = z;
                  }
                );

                
              } catch (error) {
                console.error('Error parsing JSON array:', error);
              }
              
            },
            error: error => {
              var ez= error;
            },
            complete: () => {     // anonym
              console.log('Request complete : '+endpoint);
            }
          });
        }
    
    ;
  }



}
