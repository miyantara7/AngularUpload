import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Materi } from 'src/app/model/materi';
import { MateriRespon } from 'src/app/model/materirespon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  dataMateri : Materi[]
  fileInfos: Observable<any>;
  materirespons = new MateriRespon()
  fileUrl;
  constructor(private uploadService: UploadFileService) {
    this.getAll()
   }
  ngOnInit(): void {
    // this.fileInfos = this.uploadService.getFiles();

  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    let mater = new Materi()
    this.progress = 0;
    mater.imageName = "javas";
    mater.file = this.selectedFiles.item(0);
    this.uploadService.upload(mater).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          // this.fileInfos = this.uploadService.getFiles();
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });
  
    this.selectedFiles = undefined;
  }

  gets(datas){
   let resp = this.uploadService.getMateri(datas).subscribe((data) => 
   { const url= window.URL.createObjectURL(data)
   window.open(url) 
   }); 
  //  let blob:any = new Blob(this.fileInfos, { type: 'text/json; charset=utf-8' });
   
  }

  getAll(){
    let resp=this.uploadService.getAllMateri().subscribe((data)=>{this.dataMateri=data , console.log(this.dataMateri)}
    ,err => console.log("Ada error : !"+ JSON.stringify(err)), 
    () => console.log("Completed !"));
    console.log(this.dataMateri);
  }
  
}
