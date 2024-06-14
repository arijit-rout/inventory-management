import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { InventoryService } from 'src/app/services/inventory.services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  inventoryItems:any = [];
  user:any;
userInfo:any;
constructor(private inventoryService: InventoryService,private toastr:ToastrService) {

}
  ngOnInit() {
    this.user=localStorage.getItem('user')  ;
    this.userInfo=JSON.parse(this.user)
    console.log(this.userInfo);
    let items=localStorage.getItem('inventoryItems');
    
    if(items){
      
        this.inventoryItems= JSON.parse(items)
    }else{
      this.inventoryService.getInventory().subscribe(items => {
        this.inventoryItems = items;
        this.inventoryService.setItems(this.inventoryItems);
      });
    }
    
    
  }
  ifStoreManager(){
    return this.userInfo.roles.includes('store-manager')?true:false;
  }
  approveAll(){
    this.inventoryItems.forEach((element:any) => {
      element.status="Approved";
    });
    this.inventoryService.setItems(this.inventoryItems);
  
    this.toastr.success('Approved all')
  }
}
