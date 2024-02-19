import { Component, OnInit } from '@angular/core';
import { navOption } from '../../models/navOptions.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  options:navOption[] = [
    { name: 'products', url: '/products' }
  ]
  constructor() { }

  ngOnInit() {
  }

}
