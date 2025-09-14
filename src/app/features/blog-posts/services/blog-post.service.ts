import { Injectable } from '@angular/core';
import { AddBlogpost } from '../models/add-blog-post.model';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { HttpClient } from '@angular/common/http';
import { UpdateBlogPost } from '../models/update-blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http: HttpClient) { }

  CreateBlogPost(data: AddBlogpost) : Observable<BlogPost>
  {
    return this.http.post<BlogPost>(`https://localhost:7157/api/BlogPosts?addAuth=true`, data)
  }

  getAllBlogPosts() : Observable<BlogPost[]>
  {
    return this.http.get<BlogPost[]>(`https://localhost:7157/api/BlogPosts`);
  }

  getBlogPostById(id: string):Observable<BlogPost>
  {
    return this.http.get<BlogPost>(`https://localhost:7157/api/BlogPosts/${id}`)
  }

  updateBlogPost(id:string, updatedBlogPost: UpdateBlogPost) :Observable<BlogPost>
  {
    return this.http.put<BlogPost>(`https://localhost:7157/api/BlogPosts/${id}?addAuth=true`, updatedBlogPost)
  }

  deleteBlogPost(id:string):Observable<BlogPost>
  {
    return this.http.delete<BlogPost>(`https://localhost:7157/api/BlogPosts/${id}?addAuth=true`)
  }
  getBlogPostByurlHandle(urlHandle: string):Observable<BlogPost>
  {
    return this.http.get<BlogPost>(`https://localhost:7157/api/BlogPosts/${urlHandle}`)
  }
}
