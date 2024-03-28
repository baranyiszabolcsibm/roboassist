import { CommonModule } from '@angular/common'; 
import { NgModule,Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, ResetPasswordFormComponent, CreateAccountFormComponent, ChangePasswordFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { DxButtonModule, DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { DxHtmlEditorModule, DxCheckBoxModule, DxSelectBoxModule ,DxProgressBarModule,DxTextAreaModule } from 'devextreme-angular';
import { VallomasComponent } from './pages/vallomas/vallomas.component';
import { DocprocessComponent } from './pages/docprocess/docprocess.component';
import { ChatComponent } from './pages/chat/chat.component';
import { MNBChatComponent } from './pages/mnbchat/mnbchat.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfJsViewerModule } from "ng2-pdfjs-viewer"; // <-- Import PdfJsViewerModule module



const routes: Routes = [
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'vallomas',
    component: VallomasComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  },
  {
    path: 'mnbchat',
    component: MNBChatComponent
  },
  {
    path: 'docprocess',
    component: DocprocessComponent
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })
    ,CommonModule, DxDataGridModule, DxFormModule
        ,DxButtonModule, DxHtmlEditorModule,
        DxCheckBoxModule,
        DxSelectBoxModule,DxProgressBarModule,DxTextAreaModule
        ,PdfViewerModule,PdfJsViewerModule
        ],

  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    ProfileComponent,
    TasksComponent,
    VallomasComponent,
    DocprocessComponent,
    ChatComponent,
    MNBChatComponent
  ]
})
export class AppRoutingModule { }
