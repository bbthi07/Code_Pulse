import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPostService } from '../../blog-posts/services/blog-post.service';
import { Observable, Subscription } from 'rxjs';
import { BlogPost } from '../../blog-posts/models/blog-post.model';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit, OnDestroy {

  url: string | null = null;
  blogPost$?: Observable<BlogPost>;
  paramSubscription?: Subscription;

  constructor(private route: ActivatedRoute,
     private blogPostService: BlogPostService
  ){
    
    
  }
  
  ngOnInit(): void {
    
      this. paramSubscription = this.route.paramMap.subscribe({
       next: (params) =>
       this.url = params.get('url')
     
     });

     if(this.url)
     {
       this.blogPost$ = this.blogPostService.getBlogPostByurlHandle(this.url);
     }
     
  }
  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
  }

}
