import firebase from 'firebase';

export class AuthService {

  private fireAuth: any;
  public userProfile: firebase.database.Reference;
  public currentUser: firebase.User;
  
  constructor() {
    console.log('Hello AuthService Provider');
  }
  
  // Login
  login(email: string, password: string): firebase.Promise<any> {
    console.log('testando Login');
    
    this.updateSession();
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  updateSession() {
    if (this.fireAuth == null) {
        this.fireAuth = firebase.auth();
        this.currentUser = this.fireAuth.currentUser;
    }
    if (this.userProfile == null) {
        this.userProfile = firebase.database().ref('users');
        
    }
  }
  
  // Signup
  signup(username: string, email: string, password: string): firebase.Promise<any> {
    console.log('testando signup');
    this.updateSession();
    return this.fireAuth.createUserWithEmailAndPassword(email, password).
        then((newUser) => {
            // sign in the user
            this.fireAuth.signInWithEmailAndPassword(email, password)
                .then((authenticatedUser) => {
                    // if successful, create user profile
                    console.log("criando usuario "+username);
                    this.userProfile.child(authenticatedUser.uid).set({
                        email: email,
                        name: username
                    })
                })
        })
  }
  
  /**
   * [resetPassword description]
   * This function will take the user's email address and send a password reset link, then Firebase will handle the
   * email reset part, you won't have to do anything else.
   *
   * @param  {string} email    [User's email address]
   */
  resetPassword(email: string): firebase.Promise<any> {
    return firebase.auth().sendPasswordResetEmail(email);
  }
  
  /**
   * This function doesn't take any params, it just logs the current user out of the app.
   */
  logout(): firebase.Promise<any> {
    return firebase.auth().signOut();
  }
  
  
  /*
  // Annonymous
  loginAnnonymous(): firebase.Promise<any> {
    if (this.fireAuth == null) {
        this.fireAuth = firebase.auth();
    }
    return this.fireAuth.signInAnonymously();
  }
 
  
  
  // current user
  getActiveUser() {
    return this.fireAuth.currentUser;
  }
  
  */
  
}
