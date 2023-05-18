import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryPageComponent } from './admin-category-page.component';

describe('AdminCategoryPageComponent', () => {
  let component: AdminCategoryPageComponent;
  let fixture: ComponentFixture<AdminCategoryPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCategoryPageComponent]
    });
    fixture = TestBed.createComponent(AdminCategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
