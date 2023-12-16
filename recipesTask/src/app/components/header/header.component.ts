import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private router: Router) {}

  ngOnInit(): void {
  
  }
  searchText: string = '';
  @Output() searchEvent = new EventEmitter<string>();
  onSearch() {
    this.searchEvent.emit(this.searchText);
  }
  InFlightResult(): boolean {
    const currentUrl = this.router.url;
    return currentUrl.includes('recipe-details');
  }
}
