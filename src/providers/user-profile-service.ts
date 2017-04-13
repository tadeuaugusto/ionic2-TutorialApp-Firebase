import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { FileChooser } from '@ionic-native/file-chooser';
// import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath, File } from 'ionic-native';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';


@Injectable()
export class UserProfileService {

    
  private fireAuth: any;
  public userProfile: firebase.database.Reference;
  public user: any[] = [];
  public currentUser: firebase.User;
  public firestore: any;
  public imgsource: any;

  constructor(private fileChooser: FileChooser) {
  
    console.log('Hello UserProfileService Provider');
    
  }
  
  updateSession() {
    if (this.fireAuth == null) {
        this.fireAuth = firebase.auth();
        if (this.currentUser == null) {
            this.currentUser = this.fireAuth.currentUser;
        }
    }
    if (this.userProfile == null) {
        this.userProfile = firebase.database().ref('users');
        
    }
    if (this.firestore == null) {
        this.firestore = firebase.storage();
    }
    
    
    
  }


  getUserProfile(): firebase.database.Reference {
    this.updateSession();
    return this.userProfile.child(this.currentUser.uid);
  }
  getUsers() {
    this.updateSession();
    /*
    return this.userProfile.map((response: Response) => {
            
                // const documents: Document[] = response.json() ? response.json() : [];
                console.log("fetchList(token):")
                console.log(response.json());
                this.user = response.json();
            })
            
    */
  }
  
  updateUserProfile(): firebase.Promise<any> {
    this.updateSession();
    return this.userProfile.child(this.currentUser.uid).update({
      name: name
    });
  }

  updateName(name: string): firebase.Promise<any> {
    this.updateSession();
    return this.userProfile.child(this.currentUser.uid).update({
      name: name
    });
  }

  updateDOB(birthDate: string): firebase.Promise<any> {
    this.updateSession();
    return this.userProfile.child(this.currentUser.uid).update({
      birthDate: birthDate,
    });
  }
  
  
  uploadimage() {
    this.updateSession();
    
    this.fileChooser.open().then((url) => {
      (<any>window).FilePath.resolveNativePath(url, (result) => {
        console.log(result);
        (<any>window).resolveLocalFileSystemURL(result, (res) => {
          res.file((resFile) => {
            var reader = new FileReader();
            reader.readAsArrayBuffer(resFile);
            reader.onloadend = (evt: any) => {
              var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
              var imageStore = this.firestore.ref().child('image');
              imageStore.put(imgBlob).then((res) => {
                alert('Upload Success');
              }).catch((err) => {
                alert('Upload Failed' + err);
              })
            }
          })
        })
        
      }
      )
    })
    
  }
  /*
  displayImageProfile(): string {
    return this.firestore.ref().child('image').getDownloadURL().then((url) => {
      this.imgsource = url;
      
      this.zone.run(() => {
        this.imgsource = url;
       })
     
    })
  }
  */


/*
  updateEmail(newEmail: string, password: string): firebase.Promise<any> {
    const credential =  firebase.auth.EmailAuthProvider
      .credential(this.currentUser.email, password);

    return this.currentUser.reauthenticate(credential).then( user => {
      this.currentUser.updateEmail(newEmail).then( user => {
        this.userProfile.child(this.currentUser.uid)
          .update({ email: newEmail });
      });
    });
  }


  updatePassword(newPassword: string, oldPassword: string): firebase.Promise<any> {
    const credential =  firebase.auth.EmailAuthProvider
      .credential(this.currentUser.email, oldPassword);

    return this.currentUser.reauthenticate(credential).then( user => {
      this.currentUser.updatePassword(newPassword).then( user => {
        console.log("Password Changed");
      }, error => {
        console.log(error);
      });
    });
  }
  */
}
