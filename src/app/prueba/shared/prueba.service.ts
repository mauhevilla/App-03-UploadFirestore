import { Injectable } from '@angular/core';

import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFirestore,AngularFirestoreCollection} from 'angularfire2/firestore';
import * as firebase from 'firebase';

//la clase
import {Upload} from './upload';


@Injectable()
export class PruebaService {

  private basePath:string = '/uploads';
  uploads: AngularFirestoreCollection<Upload[]>;
  constructor(private af: AngularFirestore, private db: AngularFireDatabase) { }

  // mis metodos
  pushUpload(upload: Upload) {
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    //uploadTask.on('state_changed', registrandoEstadoSubida, errorSubida, finSubida);


    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        //upload in progress
        upload.progress = Math.round((uploadTask.snapshot.bytesTransferred /uploadTask.snapshot.totalBytes) * 100);
      },
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
        upload.url = uploadTask.snapshot.downloadURL
        upload.name = upload.file.name
        this.saveFileData(upload)
      }
    );
  }

 
  // Writes the file details to the realtime db
  private saveFileData(upload: Upload) {
    this.db.list(`${this.basePath}/`).push(upload);
  }

  deleteUpload(upload: Upload) {
    this.deleteFileData(upload.$key)
    .then( () => {
      this.deleteFileStorage(upload.name)
    })
    .catch(error => console.log(error))
  }

  // Deletes the file details from the realtime db
  private deleteFileData(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name:string) {
    let storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete()
  }


}
