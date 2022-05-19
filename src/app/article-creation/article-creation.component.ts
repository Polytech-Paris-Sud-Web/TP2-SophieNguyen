import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArticleService } from "../article.service";
import { Router } from "@angular/router";
import {AuthorService} from "../author.service";
import {Subscription} from "rxjs";
import {Author} from "../author/author";
import {ArticleCreation} from "./article-creation";
import {Meta} from "@angular/platform-browser";

@Component({
  selector: 'app-article-creation',
  templateUrl: './article-creation.component.html',
  styleUrls: ['./article-creation.component.css']
})
/**
 * Article creation page
 */
export class ArticleCreationComponent implements OnInit, OnDestroy {
  /** Article form group */
  articleForm: FormGroup;
  /** Observable execution for Authors retrieval */
  authorSubscription: Subscription | undefined;
  /** Author select dropdown values */
  authors: Author[] = [];

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private authorService: AuthorService,
    private router: Router,
    private meta: Meta) {
    this.articleForm = this.fb.group({
      title: ['Fake Title', Validators.required ],
      content: ['', Validators.required ],
      authorId: [null, Validators.required ],
    });
  }

  ngOnInit(): void {
    this.feedAuthors();

    this.meta.updateTag({
      name: "description",
      content: "Write an article full of interesting facts about the life with our form"
    });
  }

  /**
   * Feed Author select dropdown values
   */
  feedAuthors() {
    this.authorSubscription = this.authorService.getAuthors().subscribe({
      next: (data) => this.authors = data
      }
    )
  }

  /**
   * Handle user submission
   */
  createArticle() {
    const article: ArticleCreation = this.articleForm?.value;
    article.publishedOn = new Date();

    this.articleService.createArticle(article).subscribe({
      next: () => { alert("Article published successfully!"); this.router.navigate(['/articles']); },
    });
  }

  ngOnDestroy(): void {
    this.authorSubscription?.unsubscribe();
  }
}
