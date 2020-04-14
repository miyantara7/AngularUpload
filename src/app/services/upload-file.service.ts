import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Materi } from '../model/materi';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  
  upload(materi : Materi): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', materi.file );
    formData.append('name', materi.imageName );
    const req = new HttpRequest('POST', this.baseUrl+`/upload/materi`,formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
 week : number =1
 day : number =2
  getMateri(datas){
    return this.http.get(this.baseUrl+"/materi?week="+datas.week+"&day="+datas.day+"&id="+datas.id,{responseType: 'blob'});
  }

  getAllMateri() : Observable<Materi[]>{
    return this.http.get<Materi[]>(this.baseUrl+"/viewall?week="+this.week+"&day="+this.day);
  }
}
