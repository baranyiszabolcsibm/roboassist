import { Component } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType ,HttpHeaders }  from '@angular/common/http';
import 'devextreme/data/odata/store';

@Component({
  selector: 'app-component-overview',
  templateUrl: './docprocess.component.html'
})

export class DocprocessComponent {
  dataSource: any;
  priority: any[];
  

  constructor(private http: HttpClient) {
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
  }

  

  public resetClick(e:any) {
    const buttonText = e.component.option('text');

    var z="event";
    console.log("click");
    this.http.get('http://localhost:5000/todo/api/v1.0/extractPdf')
      .subscribe(result => {
        var z = result;
        console.log(result);
    }, error => console.error(error));
  }
  capitalize(buttonText: any) {
    throw new Error('Method not implemented.');
  }



public callReset() {

  const headers ={    'accept': 'application/json'  };
  const formData = new FormData();
  //formData.append('userid', JSON.stringify(this.commonUserData.currentId));
  let URL = 'http://91.107.238.245:8008/reset';
  this.http.post(URL,null,{headers})
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
}
}
