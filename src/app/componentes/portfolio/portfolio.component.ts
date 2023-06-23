import { Component } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate(1000)])
    ])
  ]
})
export class PortfolioComponent {

  constructor(private portfolioService: PortfolioService) { }

  componenteActual: string = 'inicio';

ngOnInit() {
  this.portfolioService.componenteActual$.subscribe(componente => {
    this.componenteActual = componente;
  });
}

}
