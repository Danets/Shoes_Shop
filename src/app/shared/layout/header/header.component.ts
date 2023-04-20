import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isSticky = false;
  headerOffset;

  @ViewChild('header', { static: true }) header: ElementRef;

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    if (window.pageYOffset >= this.headerOffset) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
  }

  ngOnInit(): void {
    this.headerOffset = this.header.nativeElement.offsetTop;
  }

  constructor(public authService: AuthService, private router: Router) {}

  onLogout(event: Event) {
    event.preventDefault();
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
}
