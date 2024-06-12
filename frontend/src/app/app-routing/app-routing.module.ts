import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { InventoryComponent } from '../components/inventory/inventory.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { ApproveComponent } from '../components/approve/approve.component';


const routes:Routes=[
  {
    path:'',
    component:DashboardComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'inventory',
    component:InventoryComponent
  },
  {
    path:'approve',
    component:ApproveComponent
  }
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
