import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  constructor(private router: Router, private route: ActivatedRoute) { }

  onCreateProduct() {
    // this.router.navigate(['categories/new'])
    // this.router.navigate(['new'], {relativeTo: this.route});
  }
}
