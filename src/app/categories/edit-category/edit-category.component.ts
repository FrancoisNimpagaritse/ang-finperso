import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ICategory } from 'src/app/models/ICategory';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  loading: boolean = false;
  categoryId: string|null = null;
  category: ICategory = {} as ICategory;
  errorMessage: string | null = null;

  constructor(private activatedRoute: ActivatedRoute, 
    private categoryService: CategoryService, private router: Router) { }

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

  updateSubmit(){
    if(this.categoryId){
      this.categoryService.updateCategory(this.categoryId, this.category).subscribe((data) => {
        this.router.navigate(['/']).then();
      }, (error) => {
        this.errorMessage = error;
        this.router.navigate([`/categories/edit/${this.categoryId}`]).then();
      });
    }
  }

}
