import { Component } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.services';
import { LoginComponent } from '../login/login.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css']
})
export class ApproveComponent {
  constructor(private inventoryService: InventoryService,private toastr:ToastrService){}
  user:any;
  userInfo:any;
  inventoryItems:any=[];
pendingItems:any=[];

ngOnInit(): void {
  this.user=localStorage.getItem('user')  ;
  this.userInfo=JSON.parse(this.user)
  console.log(this.userInfo);
  if(localStorage.getItem('inventoryItems')){
    let items=localStorage.getItem('inventoryItems');
    if(items){
      this.inventoryItems= JSON.parse(items)
    }
  }else{
    this.inventoryService.getInventory().subscribe(items => {
      this.inventoryItems = items;
      localStorage.setItem('inventoryItems',JSON.stringify(this.inventoryItems));
    });
  }
  this.pendingItems=this.inventoryItems.filter((x:any)=>x.status.toLowerCase()=="pending");
    console.log(this.pendingItems);
}

approveItem(id:any){
  console.log(id);
  
  const item = this.inventoryItems.find((i: any) => i.productId === id);
  if (item) {
    console.log('found');
    
    item.status = 'Approved';
  } 
  this.inventoryService.setItems(this.inventoryItems);
  this.pendingItems=this.inventoryItems.filter((x:any)=>x.status.toLowerCase()=="pending");

}
approveAll(){
  this.inventoryItems.forEach((element:any) => {
    element.status="Approved";
  });
  this.inventoryService.setItems(this.inventoryItems);
  this.pendingItems=this.inventoryItems.filter((x:any)=>x.status.toLowerCase()=="pending");

  this.toastr.success('Approved all')
}
}
