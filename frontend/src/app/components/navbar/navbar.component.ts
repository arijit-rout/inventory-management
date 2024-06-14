import { Component } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
constructor(private toastr:ToastrService,private router:Router){

}
  user:any;
  userInfo:any;
  ngOnInit(): void {
    this.user=localStorage.getItem('user')  ;
    this.userInfo=JSON.parse(this.user)
    
  }

  ifStoreManager(){
    return this.userInfo?.roles.includes('store-manager')?true:false;
  }
  dropDownToggle=false;
  onClickProfile(){
this.dropDownToggle=!this.dropDownToggle;
  }
  logout(){
    localStorage.removeItem('user');
    this.toastr.success('Logged out successfully');
    setTimeout(() => {
    this.router.navigate(['/login']);
      
    }, 1000);
    // window.location.reload()
  }
}
