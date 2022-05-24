import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ICategory } from 'src/app/models/ICategory';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {
  loading: boolean = false;
  categoryId: string|null = null;
  category: ICategory = {} as ICategory;
  errorMessage: string | null = null;

  constructor(private activatedRoute: ActivatedRoute, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.categoryId = param.get('categoryId');
    });

    if(this.categoryId) {
      this.loading = true;
      this.categoryService.getCategory(this.categoryId).subscribe((data) => {
        this.category = data;
        this.loading = false;
      }, (error) => {
        this.errorMessage = error;
        this.loading = false;
      });
    }
  }

}
