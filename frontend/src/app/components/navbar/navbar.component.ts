import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  user:any;
  userInfo:any;
  ngOnInit(): void {
    this.user=localStorage.getItem('user')  ;
    this.userInfo=JSON.parse(this.user)
    
  }

  ifStoreManager(){
    return this.userInfo.roles.includes('store-manager')?true:false;
  }
  dropDownToggle=false;
  onClickProfile(){
this.dropDownToggle=!this.dropDownToggle;
  }
  logout(){
    localStorage.removeItem('user');
    window.location.reload()
  }
}
