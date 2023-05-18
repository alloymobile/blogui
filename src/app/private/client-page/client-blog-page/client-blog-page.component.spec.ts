import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBlogPageComponent } from './client-blog-page.component';

describe('ClientBlogPageComponent', () => {
  let component: ClientBlogPageComponent;
  let fixture: ComponentFixture<ClientBlogPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientBlogPageComponent]
    });
    fixture = TestBed.createComponent(ClientBlogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
