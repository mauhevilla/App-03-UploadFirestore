import { Component, OnInit } from '@angular/core';
// traigo firestore
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

//el servicio y la clase
import {PruebaService} from './shared/prueba.service';
import {Upload} from './shared/upload';
import * as _ from "lodash";

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {
    
  items: Observable<any[]>;
  selectedFiles: FileList;
  currentUpload: Upload;

  constructor(db: AngularFirestore,private upSvc: PruebaService) { 
    this.items = db.collection('items').valueChanges(); }

  ngOnInit() {
  }

  // mis metodos
  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  uploadSingle() {
    let file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload)
  }

  uploadMulti() {
    let files = this.selectedFiles
    let filesIndex = _.range(files.length)    
       _.each(filesIndex, (idx) => {
      this.currentUpload = new Upload(files[idx]);
      this.upSvc.pushUpload(this.currentUpload)})
  }


}
