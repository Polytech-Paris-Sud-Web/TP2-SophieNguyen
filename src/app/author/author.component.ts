import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from "rxjs";
import { AuthorService } from "../author.service";
import { Router } from "@angular/router";
import { Author } from "./author";
import {Meta} from "@angular/platform-browser";

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
/**
 * Author biography page
 */
export class AuthorComponent implements OnInit, OnDestroy {

  /** Observable execution */
  private authorSub: Subscription | undefined;
  /** Current author */
  author: Author | undefined;

  constructor(private authorService: AuthorService, private router: Router, private meta: Meta) { }

  ngOnInit(): void {
    const id = Number(/^\/authors\/(\d+)(?<!\D)$/g.exec(this.router.url)?.[1]);
    this.updateTag();

    if (id) {
      this.fetch(id);
    }
  }

  updateTag(): void {
    this.meta.updateTag({
      name: "description",
      content: this.author ? (this.author.biography.length > 250 ? this.author.biography.substring(0, 250) + "..." : this.author.biography)
        : "It seems like your author is missing."
    });
  }

  /**
   * Fill author data to display
   *
   * @param id Current author identifier
   */
  fetch(id: number) {
    this.authorSub = this.authorService.getAuthor(id).subscribe({
      next: (data) => {
        this.author = data;
        this.updateTag();
      }
    });
  }

  ngOnDestroy(): void {
    this.authorSub?.unsubscribe();
  }

}
