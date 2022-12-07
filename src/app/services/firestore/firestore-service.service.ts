import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreServiceService {

  constructor(private angularFirestore: AngularFirestore) { }

  // Insert the record in the firestore database in the collection `usage-logs`
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
