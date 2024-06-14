import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InventoryService } from 'src/app/services/inventory.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  credentials = { email: '', password: '' };

  constructor(private inventoryService: InventoryService, private router: Router,private toastr:ToastrService) {}

  login() {
    this.inventoryService.login(this.credentials).subscribe(response => {
      if (response.success) {
        this.toastr.success('Logged in successsfully')
        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['']);
      } else {
        this.toastr.success(response.message)

      }
    });
  }
}
