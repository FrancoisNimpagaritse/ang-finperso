import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ICategory } from 'src/app/models/ICategory';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  public loading: boolean = false;
  public categories: ICategory[] = [];
  public errorMessage: string|null = null;

  constructor(private categoryService: CategoryService, private activatedRoute: ActivatedRoute) { 

  }

  ngOnInit(): void {
    this.getAllCategoriesFromServer();
  }

  getAllCategoriesFromServer() {
    this.loading = true;
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data;
      this.loading = false;
    }, (error) => {
      this.errorMessage = error;
      this.loading = false;
    });
  }

  clickDeleteCategory(categoryId: string|undefined) {
    if(categoryId) {
      this.categoryService.deleteCategory(categoryId).subscribe((data) => {
        this.getAllCategoriesFromServer();
      }, (error) =>{
        this.errorMessage = error;
      });
    }
  }

}
