import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { UserAccountListComponent } from './user-account-list/user-account-list.component';
import { UserAccountDetailComponent } from './user-account-detail/user-account-detail.component';


const routes: Routes = [
  //{ path: '', component:UserAccountListComponent},
  //{ path: '', redirectTo: '/departments', pathMatch: 'prefix'},
  { path: '', redirectTo: '/user-account-list', pathMatch: 'full'},
  { path: 'user-account-list', component: UserAccountListComponent},
  { 
    path: 'user-account-list/:id',  
    //component: UserAccountDetailComponent,
    children: [
      //{ path: 'overview', component: DepartmentOverviewComponent},
      //{ path: 'contact', component: DepartmentContactComponent}
    ]
  },
  { path: 'user-account-detail', component: UserAccountDetailComponent},
  //{ path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [UserAccountListComponent, 
                                  UserAccountDetailComponent
                                  ]
