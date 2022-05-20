import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Article} from "./article";
import {ArticleService} from "../article.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Meta} from "@angular/platform-browser";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})

/**
 * Article page in read-only mode
 * or row in list of articles
 *
 * @see ArticlesComponent
 */
export class ArticleComponent implements OnInit, OnDestroy {
  private fetchSubscription: Subscription | undefined;
  private deleteSubscription: Subscription | undefined;

  private fromRoute: boolean = false;

  @Input()
  article: Article | undefined;

  @Output()
  deletedArticle: EventEmitter<any> = new EventEmitter();

  constructor(private articleService: ArticleService, private router: Router, private route: ActivatedRoute, private meta: Meta) {
  }

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get("id");
    this.fromRoute = Boolean(paramId);

    const id = Number(paramId);

    this.updateTag();

    if (id) {
      this.fetch(id);
    }
  }

  isReadonly(): boolean {
    return this.fromRoute;
  }

  updateTag(): void {
    if (!this.isReadonly())
      return;

    this.meta.updateTag({
      name: "description",
      content: this.article ? (this.article.content.length > 250 ? this.article.content.substring(0, 250) + "..." : this.article.content)
        : "Your article does not exist anywhere..."
    });
  }

  /**
   * Fetch current article data
   *
   * @param id Article identifier
   */
  fetch(id: number): void {
    this.fetchSubscription = this.articleService.getArticle(id).subscribe({
      next: (data) => {
        this.article = data;
        this.updateTag();
      },
    });
  }

  /**
   * Delete current article
   */
  delete(): void {
    if (this.article)
      this.deleteSubscription = this.articleService.deleteArticle(this.article.id).subscribe({
        next: () => {
          alert("Article removed successfully.");
          if (this.isReadonly())
            this.router.navigate(['/articles']);
          else
            this.deletedArticle.emit();
        },
        error: () => alert("Error occurred when trying to remove article...")
      })
  }

  ngOnDestroy() {
    this.fetchSubscription?.unsubscribe();
    this.deleteSubscription?.unsubscribe();
  }

}
