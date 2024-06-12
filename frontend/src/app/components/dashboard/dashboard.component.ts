import { Component } from '@angular/core';
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
constructor(private inventoryService: InventoryService) {

}
  ngOnInit() {
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
    
    
  }
  ifStoreManager(){
    return this.userInfo.roles.includes('store-manager')?true:false;
  }
}
