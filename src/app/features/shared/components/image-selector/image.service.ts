import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { BlogImage } from '../../models/blog-image.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  selectedImage : BehaviorSubject<BlogImage> = new BehaviorSubject<BlogImage>({
      id: '',
      title: '',
      fileName: '',
      fileExtension: '',
      url: ''
  });
  constructor(private http: HttpClient) { }

  getAllImages():Observable<BlogImage[]>{
    return this.http.get<BlogImage[]>(`https://localhost:7157/api/Images`)
  }
  
  uploadImage(file: File, fileName: string, title: string):Observable<BlogImage>
  {
    const formData = new FormData()
    formData.append('file', file),
    formData.append('fileName', fileName),
    formData.append('title', title)

    return this.http.post<BlogImage>(`https://localhost:7157/api/Images`, formData);
  }

  selectImage(image:BlogImage) : void{
    this.selectedImage.next(image);
  }

  onSelectImage() : Observable<BlogImage>{
    return this.selectedImage.asObservable();
  }
}
