import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
/**
 * Search bar
 */
export class SearchbarComponent implements OnInit {

  /** Text to search */
  @Input()
  text: string = "";

  @Output()
  textChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  search() {
    this.textChange.emit(this.text);
  }

}
