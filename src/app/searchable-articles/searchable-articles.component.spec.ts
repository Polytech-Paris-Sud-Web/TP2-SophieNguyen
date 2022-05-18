import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchableArticlesComponent } from './searchable-articles.component';

describe('SearchableArticlesComponent', () => {
  let component: SearchableArticlesComponent;
  let fixture: ComponentFixture<SearchableArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchableArticlesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchableArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
