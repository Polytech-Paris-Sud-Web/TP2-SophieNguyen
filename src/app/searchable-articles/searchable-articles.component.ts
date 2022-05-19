import { Component } from '@angular/core';
import {ArticlesComponent} from "../articles/articles.component";
import {ArticleService} from "../article.service";
import {Meta} from "@angular/platform-browser";

@Component({
  selector: 'app-searchable-articles',
  templateUrl: './searchable-articles.component.html',
  styleUrls: ['./searchable-articles.component.css']
})
export class SearchableArticlesComponent extends ArticlesComponent {

  text: string = "";

  constructor(protected override articleService: ArticleService, private meta: Meta) {
    super(articleService);
  }

  override ngOnInit() {
    super.ngOnInit();

    this.meta.updateTag({
        name: "description",
        description: "All articles published so far by our talented contributors.",
      });
  }

}
