import { Component, OnInit } from '@angular/core';
import { Link } from "./link";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
/**
 * Navigation bar common to all routes
 */
export class NavbarComponent implements OnInit {
  /** Links to display on bar */
  links: Link[] = [
    {
      title: "Home",
      path: "/"
    },
    {
      title: "Articles",
      path: "/articles"
    },
    {
      title: "New +",
      path: "/create"
    },
  ];

  constructor(private router: Router) { }

  /**
   * Check if current route path matches with a given path
   * To highlight the link on display
   *
   * @param path Route path
   */
  isCurrent(path: string): boolean {
    return this.router.url == path;
  }

  ngOnInit(): void {
  }

}
