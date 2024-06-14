import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = 'assets/data.json';

  constructor(private http: HttpClient) { }
   inventoryItems = new BehaviorSubject<any>([]);
  login(credentials: any): Observable<any> {
    return new Observable(observer => {
      this.http.get(this.apiUrl).subscribe((data: any) => {
        console.log(data.users,credentials);
        
        let user = data.users.find((u: any) => u.email === credentials.email && u.password === credentials.password);

        console.log(user);
        
        if (user) {
          observer.next({ success: true, user });
        } else {
          observer.next({ success: false, message: 'Invalid credentials' });
        }
      });
    });
  }

  getInventory(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(map((data: any) => data.inventory));
  }

  addInventory(item: any): Observable<any> {
    return new Observable(observer => {
      this.http.get(this.apiUrl).subscribe((data: any) => {
        data.inventory.push(item);
        observer.next({ success: true, inventory: item });
        observer.complete();
      });
    });
  }

  approveInventory(productId: string): Observable<any> {
    console.log('logging');
    
    return new Observable(observer => {
      this.http.get(this.apiUrl).subscribe((data: any) => {
        const item = data.inventory.find((i: any) => i.productId === productId);
        if (item) {
          item.status = 'Approved';
          observer.next({ success: true, inventory: item });
        } else {
          observer.next({ success: false, message: 'Item not found' });
        }
        observer.complete();
      });
    });
  };

  setItems(items:any){
    localStorage.setItem('inventoryItems',JSON.stringify(items));
  }

  
}
