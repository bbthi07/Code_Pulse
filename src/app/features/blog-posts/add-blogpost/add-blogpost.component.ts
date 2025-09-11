import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogpost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../category/models/category.model';
import { ImageService } from '../../shared/components/image-selector/image.service';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit, OnDestroy {
  model: AddBlogpost;
  isImageSelectorVisible : boolean = false;
 categories$? : Observable<Category[]>;
  imageSelectorSubscription?: Subscription;
  
  constructor(private blogPostService: BlogPostService,
    private router: Router,
    private categoryService: CategoryService,
    private imageService: ImageService)
  {

    this.model = {
    title :'',
    shortDescription: '',
    content: '',
    urlHandle: '',
    featuredImageUrl: '',
    author: '',
    publishedDate: new Date(),
    isVisible: true,
    categories: []
    }
  }
 
  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();

    this.imageSelectorSubscription = this.imageService.onSelectImage()
     .subscribe({
       next : (selectedImage) =>{
         this.model.featuredImageUrl = selectedImage.url;
         this.closeImageSelector();
       }
     })
  }

  onFormSubmit(): void{
    console.log("this.model");
    this.blogPostService.CreateBlogPost(this.model)
    .subscribe({
        next : (resposne) =>{
          this.router.navigateByUrl('/admin/blogposts');
        }
    });
  }

  openImageSelector() : void {
    this.isImageSelectorVisible = true;
  }
  closeImageSelector():void {
    this.isImageSelectorVisible = false;
  }

  ngOnDestroy(): void {
    this.imageSelectorSubscription?.unsubscribe();
  }

}
