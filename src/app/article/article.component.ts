import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Article} from "./article";
import {ArticleService} from "../article.service";
import {Router} from "@angular/router";
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
  /** Observable execution for fetching data */
  private fetchSubscription: Subscription | undefined;
  /** Observable execution for removing article */
  private deleteSubscription: Subscription | undefined;
  private fromRoute: boolean = false;

  /** Current article */
  @Input()
  article: Article | undefined;

  /** Emit an event to parent (if the component is used this way) to order refresh */
  @Output()
  deletedArticle: EventEmitter<any> = new EventEmitter();

  constructor(private articleService: ArticleService, private router: Router, private meta: Meta) {
  }

  ngOnInit(): void {
    this.fromRoute = /\/articles\/.+/g.test(this.router.url);
    this.updateTag();

    const id = Number(/^\/articles\/(\d+)(?<!\D)$/g.exec(this.router.url)?.[1]);
    if (id) {
      this.fetch(id);
    }
  }

  /**
   * Check if the component is used to show an article or by a parent component
   */
  isReadonly(): boolean {
    return this.fromRoute;
  }

  updateTag(): void {
    if (!this.isReadonly())
      return;

    this.meta.updateTag({
      name: "description",
      description: this.article ? (this.article.content.length > 250 ? this.article.content.substring(0, 250) + "..." : this.article.content)
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
      }
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
        }
      })
  }

  ngOnDestroy() {
    this.fetchSubscription?.unsubscribe();
    this.deleteSubscription?.unsubscribe();
  }

}
