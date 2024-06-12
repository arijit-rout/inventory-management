import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html'
})
export class InventoryComponent implements OnInit {
  inventoryItems:any = [];
  inventoryForm: FormGroup;
  constructor(private inventoryService: InventoryService,private fb: FormBuilder) {
    this.inventoryForm = this.fb.group({
      productId: [''],
      productName: ['', Validators.required],
      vendor: ['', Validators.required],
      mrp: ['', [Validators.required, Validators.min(0)]],
      batchNum: ['', Validators.required],
      batchDate: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(0)]],
      status: ['Pending', Validators.required]
    });
  }
user:any;
userInfo:any;

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
  newProduct:any={};
newItem:any
  addInventory() {
    if(this.userInfo.roles.includes('store-manager')){
      console.log(true);
      this.inventoryForm.get('status')?.setValue('Approved');
      console.log();
      
    }
    let productId=this.generateProductId();
    console.log(productId);
    if (this.inventoryForm.valid) {
      const newProduct = { ...this.inventoryForm.value, productId: this.generateProductId() };
      this.inventoryService.addInventory(newProduct).subscribe((response:any) => {
        if (response.success) {
          console.log(response);
          
          this.inventoryItems.push(response.inventory);
          localStorage.setItem('inventoryItems',JSON.stringify(this.inventoryItems));
        }
      });
    }
 
  }
  generateProductId(): string {
    let pId: string;
    let found;
    
    do {
      pId = 'P' + Math.floor(100 + Math.random() * 900);
      found = this.inventoryItems.find((x: any) => x.productId === pId);
    } while (found);
    
    return pId;
  }
}
