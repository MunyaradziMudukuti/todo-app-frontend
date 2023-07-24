import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  searchTerm: string = "";
  @Output() searchInput: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {

  }

  onSearchInput(searchTerm: string){
    console.log("############ Nav Search Term ",searchTerm);
    this.searchInput.emit(this.searchTerm)
  }



}
