import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
// firebase
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { PruebaComponent } from './prueba/prueba.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
//los servicios
import {PruebaService} from './prueba/shared/prueba.service';
@NgModule({
  declarations: [
    AppComponent,
    PruebaComponent
  ],
  imports: [
    BrowserModule,AngularFireModule.initializeApp(environment.configFirebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage feature
    AngularFireDatabaseModule
  ],
  providers: [PruebaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
