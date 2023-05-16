import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isAuthenticated = false;

  constructor(private userService: UserService,
    private router: Router) {
    this.isAuthenticated = this.userService.getIsAuthenticated();
  }

  ngOnInit(): void {

  }

  onClick() {
    this.userService.logout()
      .then(() => {
        this.router.navigate(['/login'])
        location.reload()

      })
      .catch(error => console.log(error));
  }

}