import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;

  constructor(private userService: UserService,
    private router: Router,
    private portfolioService: PortfolioService) { }

    mostrarComponente(componente: string) {
      this.portfolioService.mostrarComponente(componente);
    }

  ngOnInit(): void {
    this.isAuthenticated = this.userService.getIsAuthenticated();
    this.userService.getAuthState().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
    this.updateMenuLinks();
    window.addEventListener('resize', this.updateMenuLinks);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.updateMenuLinks);
  }

  onClick() {
    this.userService.logout()
      .then(() => {
      })
      .catch(error => console.log(error));
      window.location.reload();
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    const navbar = document.querySelector('.fixed-top');
    if (element && navbar) {
      setTimeout(() => {
        const navbarHeight = navbar.clientHeight;
        const position = element.offsetTop - navbarHeight - 20;
        window.scrollTo({ top: position, behavior: 'smooth' });
      }, 300);
    }
  }

  updateMenuLinks = () => {
    const menuLinks = document.querySelectorAll('.navbar-nav a');
    if (window.innerWidth < 992) {
      menuLinks.forEach(link => {
        link.setAttribute('data-bs-toggle', 'collapse');
        link.setAttribute('data-bs-target', '#navbarNavAltMarkup');
      });
    } else {
      menuLinks.forEach(link => {
        link.removeAttribute('data-bs-toggle');
        link.removeAttribute('data-bs-target');
      });
    }
  }
}