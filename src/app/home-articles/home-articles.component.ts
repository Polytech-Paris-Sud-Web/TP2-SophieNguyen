import {Component, OnInit} from '@angular/core';
import {ArticlesComponent} from "../articles/articles.component";
import {Meta} from "@angular/platform-browser";
import {ArticleService} from "../article.service";

@Component({
  selector: 'app-home-articles',
  templateUrl: './home-articles.component.html',
})
/**
 * Homepage showing the last 10 articles posted
 */
export class HomeArticlesComponent extends ArticlesComponent implements OnInit {

  constructor(protected override articleService: ArticleService, private meta: Meta) {
    super(articleService);
  }

  override ngOnInit() {
    super.ngOnInit();

    this.meta.updateTag({
        name: "description",
        description: "This blog is not about SharePoint, a famous web-based collaborative platform developed by Microsoft, unfortunately. " +
          "No charged and dubious training either.",
      });
  }

  override fetchArticles() {
    if (this.articleSubscription?.closed == false) this.articleSubscription?.unsubscribe();
    this.articleSubscription = this.articleService.getLastArticles().subscribe({
      next: (data) => {
        this.articles = data;
      },
    });
  }

}
