import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.isAuthenticated = this.userService.getIsAuthenticated();
    this.userService.getAuthState().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  onClick() {
    this.userService.logout()
      .then(() => {
      })
      .catch(error => console.log(error));
  }
}