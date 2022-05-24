import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { CategoriesComponent } from './categories/categories/categories.component';
import { EditCategoryComponent } from './categories/edit-category/edit-category.component';
import { ViewCategoryComponent } from './categories/view-category/view-category.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', redirectTo: 'categories/admin', pathMatch: 'full'},
  {path: 'categories/admin', component: CategoriesComponent},
  {path: 'categories/add', component: AddCategoryComponent},
  {path: 'categories/edit/:categoryId', component: EditCategoryComponent},
  {path: 'categories/view/:categoryId', component: ViewCategoryComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
