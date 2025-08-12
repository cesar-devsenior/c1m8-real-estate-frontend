import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../features/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  private router = inject(Router);
  
  // Exponer el servicio para usar en el template
  protected authService = inject(AuthService);

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
