import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirestoreData } from './firestore-data.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreServiceService {

  constructor(private angularFirestore: AngularFirestore) { }

  insertRecord(firestoreData: any){
    return new Promise<any>((resolve, reject) =>{
      this.angularFirestore
        .collection('usage-logs')
        .add(firestoreData)
        .then(
          (response) => {
            console.log(response);
          },
          (error) => reject(error)
        );
    });
  }
}
