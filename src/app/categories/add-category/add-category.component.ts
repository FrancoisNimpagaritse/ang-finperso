import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ICategory } from 'src/app/models/ICategory';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  loading: boolean = false;
  categoryId: string|null = null;
  category: ICategory = {} as ICategory;
  errorMessage: string | null = null;

  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
  }

  public createSubmit() {
    this.categoryService.createCategory(this.category).subscribe((data) => {
      this.router.navigate(['/']).then();
    }, (error) => {
      this.errorMessage = error;
      this.router.navigate(['/categories/add']).then();
    });
  }

}
