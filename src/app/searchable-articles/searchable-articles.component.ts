import { Component } from '@angular/core';
import {ArticlesComponent} from "../articles/articles.component";

@Component({
  selector: 'app-searchable-articles',
  templateUrl: './searchable-articles.component.html',
  styleUrls: ['./searchable-articles.component.css']
})
export class SearchableArticlesComponent extends ArticlesComponent {

  text: string = "";

}
