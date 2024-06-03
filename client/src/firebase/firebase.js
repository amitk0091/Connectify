
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
    GithubAuthProvider,
} from "firebase/auth";

import { getDatabase, set, get, ref, child, update } from "firebase/database";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_APIKEY,
    authDomain: import.meta.env.VITE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_PROJECTID,
    storageBucket:import.meta.env.VITE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_APPID,
    measurementId: import.meta.env.VITE_MEASUREMENTID,
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const provider = new GoogleAuthProvider();
const provider_git = new GithubAuthProvider();

//firebase database handle
function writeUserData(userId, email) {
    set(ref(database, 'users/' + userId), {
        email: email,
        plan: "free",
    });
}


  // signup handle
export const handleSignup = (jsonData) => {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, jsonData.email, jsonData.password)
            .then((userCredential) => {
                const user = userCredential.user;
                writeUserData(user.uid, user.email);
                resolve({auth: user.uid , error : ''});
            })
            .catch((error) => {
                console.log(error.message);
                reject({auth:"", error: error.message});
            });
    });
};



//Sign in handle
export const handleSignin = (jsonData) => {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, jsonData.email, jsonData.password)
            .then((userCredential) => {
                const user = userCredential.user;
                resolve({auth: user.uid , error : ''});
            })
            .catch((error) => {
                reject({auth:"", error: error.message});
            });
    });
};





//  check user first time 
//  Check if the user exists in the database


//Function to check if the user exists in the database
const checkUserExistence = (userId) => {
    return new Promise((resolve, reject) => {
        const dbRef = ref(database);
        get(child(dbRef, `users/${userId}`)).then((snapshot) => {
            if (snapshot.exists()) {
                const userInfo = snapshot.val();
                resolve(true);
            } else {
                resolve(false); // Resolve with null when no data available
            }
        }).catch((error) => {
            console.error(error);
            reject(error); //Reject the promise if an error occurs
        });
    });
    
}


//google signin
export const handleGoogleSignin = () => {
    return new Promise((resolve, reject) => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                checkUserExistence(user.uid)
                    .then((exists) => {
                        if (exists) {
                            console.log('User exists');
                            // Handle existing user logic
                            resolve({auth: user.uid , error : ''}); // Resolve with user UID
                        } else {
                            console.log('New user');
                            writeUserData(user.uid, user.email);
                            // Handle new user logic
                            resolve({auth: user.uid , error : ''}); // Resolve with user UID
                        }
                    })
                    .catch((error) => {
                        console.error('Error checking user existence:', error);
                        reject({auth:"", error: error.message});; // Reject with error
                    });
            })
            .catch((error) => {
                console.error('Error signing in with Google:', error);
                reject({auth:"", error: error.message}); // Reject with error
            });
    });
};


export const handleGithubSignin = () => {
    return new Promise((resolve, reject) => {
        signInWithPopup(auth, provider_git)
            .then((result) => {
                const credential = GithubAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                checkUserExistence(user.uid)
                    .then((exists) => {
                        if (exists) {
                            console.log('User exists');
                            // Handle existing user logic
                            resolve({auth: user.uid , error : ''}); // Resolve with user UID
                        } else {
                            console.log('New user');
                            writeUserData(user.uid, user.email);
                            // Handle new user logic
                            resolve({auth: user.uid , error : ''}); // Resolve with user UID
                        }
                    })
                    .catch((error) => {
                        console.error('Error checking user existence:', error);
                        reject({auth:"", error: error.message}); // Reject with error
                    }); 
            })
            .catch((error) => {
                console.error('Error signing in with GitHub:', error);
                reject({auth:"", error: error.message}); // Reject with error
            });
    });
};


//forget password
export const handleforgetPassword =  async(email)=>{
    
     if (email.length == 0) {
             alert("Enter email");
             return;
         }
         sendPasswordResetEmail(auth, email)
             .then(() => {
                 alert('check your Mailbox')
                 return
            })
             .catch((error) => {
                 const errorCode = error.code;
                 const errorMessage = error.message;
                 
             });
}
 


