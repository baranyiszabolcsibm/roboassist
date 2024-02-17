import { Component } from '@angular/core';
import { HttpClient,  HttpParams  }  from '@angular/common/http';
import 'devextreme/data/odata/store';
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
  dataSource: any;
  extractedDataJson:any;
  tabs: TabConfig[] | undefined;
  currentTab: string[] | undefined;
  priority: any[];
  serverUrl:string="http://91.107.238.245:8080/";
  

  constructor(private http: HttpClient,service: Service) {
    this.dataSource = {
      store: {
        version: 2,
        type: 'odata',
        key: 'Task_ID',
        url: 'https://js.devexpress.com/Demos/DevAV/odata/Tasks'
      },
      expand: 'ResponsibleEmployee',
      select: [
        'Task_ID',
        'Task_Subject',
        'Task_Start_Date',
        'Task_Due_Date',
        'Task_Status',
        'Task_Priority',
        'Task_Completion',
        'ResponsibleEmployee/Employee_Full_Name'
      ]
    };
    this.priority = [
      { name: 'High', value: 4 },
      { name: 'Urgent', value: 3 },
      { name: 'Normal', value: 2 },
      { name: 'Low', value: 1 }
    ];

  
    this.tabs = service.getTabsData();
    this.currentTab = this.tabs[2].value;

  }
  
  ngOnInit(): void {
    //template reload
    this.http.get('./assets/templates/markupsample.txt', { responseType: 'text' })
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
    this.getDocMetadata();
    this.http.get('./assets/templates/'+templatename+'.txt', { responseType: 'text' })
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

     
    return;

   
  }

  public getDocMetadata(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //let params = new URLSearchParams();
    //    params.append("filename", 'c:\\tmp\\1.pdf')

    let queryparams = new HttpParams().set("filename", 'c:\\tmp\\1.pdf'); //Create new HttpParams  .set("paramName2", paramValue2)

    this.http.get('http://127.0.0.1:5000/bmapi/getMetadataProxy', { params:queryparams })
    .subscribe({
      next: res => {
        var z= res;
        this.extractedDataJson =  res ;
        this.valueContent = this.valueContent.replace("{{csereldki}}","kukutyin");
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



}
