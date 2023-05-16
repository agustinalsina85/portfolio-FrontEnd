import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
import { LoginComponent } from './componentes/login/login.component';
import { canActivate, redirectUnauthorizedTo } from "@angular/fire/auth-guard"

const routes: Route[] = [
  {path:'portfolio',component:PortfolioComponent},
  {path: 'login',component:LoginComponent},
  {path: '',redirectTo: 'portfolio',pathMatch:'full'}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }