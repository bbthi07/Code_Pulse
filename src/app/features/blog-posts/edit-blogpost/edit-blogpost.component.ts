import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { Category } from '../../category/models/category.model';
import { CategoryService } from '../../category/services/category.service';
import { UpdateBlogPost } from '../models/update-blog-post.model';
import { ImageService } from '../../shared/components/image-selector/image.service';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit, OnDestroy {
  id: string | null = null; 
  model?: BlogPost;
  categories$?: Observable<Category[]>;
  selectedCategories?: string[];
  isImageSelectorVisible : boolean = false;

  routeSubscription?: Subscription;
  updateBlogPostSubscription?: Subscription;
  getBlogPostSubscription?: Subscription;
  deleteBlogPostSubscription?: Subscription;
  imageSelectSubscription?: Subscription;

  constructor(private route: ActivatedRoute,
    private blogPostService: BlogPostService,
    private categoryService: CategoryService,
    private router: Router,
    private imageService: ImageService)
  {

  }

  ngOnInit(): void {

    this.categories$ = this.categoryService.getAllCategories();

    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
      }
    })
   if(this.id)
   {
    this.getBlogPostSubscription = this.blogPostService.getBlogPostById(this.id).subscribe({
       next: (response) => {
          this.model = response;
          this.selectedCategories= response.categories.map(x => x.id);
       }
    })

   }

   this.imageSelectSubscription =  this.imageService.onSelectImage()
    .subscribe({
       next: (response) =>
         {
           if (this.model)
           {
             this.model.featuredImageUrl = response.url;
             this.isImageSelectorVisible = false;
           }
         }
    })
  }

  onFormSubmit(){
    if (this.model && this.id)
    {
      var updateBlogPost : UpdateBlogPost = {

        title : this.model.title,
        shortDescription : this.model.shortDescription,
        urlHandle: this.model.urlHandle,
        author: this.model.author,
        featuredImageUrl: this.model.featuredImageUrl,
        isVisible: this.model.isVisible,
        publishedDate: this.model.publishedDate,
        content: this.model.content,
        categories: this.selectedCategories ?? []
      }
    
      this.updateBlogPostSubscription= this.blogPostService.updateBlogPost(this.id, updateBlogPost)
      .subscribe({
        next: response =>
          this.router.navigateByUrl('/admin/blogposts')
     });
    }
  }

  onDelete() :void{
    if (this.id)
    {
       this.deleteBlogPostSubscription = this.blogPostService.deleteBlogPost(this.id)
       .subscribe({
         next: response =>{
           this.router.navigateByUrl('/admin/blogposts')
         }

       });
    }
  }

  openImageSelector() : void {
    this.isImageSelectorVisible = true;
  }
  closeImageSelector():void {
    this.isImageSelectorVisible = false;
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.getBlogPostSubscription?.unsubscribe();
    this.deleteBlogPostSubscription?.unsubscribe();
    this.imageSelectSubscription?.unsubscribe();
  }

}
