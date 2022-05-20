import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from "rxjs";
import { AuthorService } from "../author.service";
import {ActivatedRoute, Router} from "@angular/router";
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
  error: string | undefined;

  constructor(private authorService: AuthorService, private router: Router, private route: ActivatedRoute, private meta: Meta) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));

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
    this.authorSub = this.authorService.getAuthor(id).subscribe(
      (data) => {
        this.author = data;
        this.updateTag();
      },
    );
  }

  ngOnDestroy(): void {
    this.authorSub?.unsubscribe();
  }

}
