import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'

import Snackbar from 'react-native-snackbar'

//dispatch is for calling function
export const signUp=(data)=>async (dispatch)=>{
console.log(data)
const {name,instaUseName,bio,email,password,country,image}=data

auth().createUserWithEmailAndPassword(email,password)
.then((data)=>{
    //NOTE
    console.log(data)
    console.log("Successful signup")

    database().ref('/users/'+data.user.uid)
    .set({
        name,
        instaUseName,
        country,
        image,
        bio,
        uid:data.user.uid
    }).then(()=>console.log("Data set"))

    Snackbar.show({
        text:"Account created",
        textColor:"white",
        backgroundColor:'green'
    })
})
.catch((error)=>{
    //NOTE
    console.log(error)
    Snackbar.show({
        text:'sign up failed',
        textColor:'white',
        backgroundColor:'red'
    })
})

}

export const signIn=(data)=>async (dispatch)=>{
    console.log(data)
    const {email,password}=data

    auth().signInWithEmailAndPassword(email,password)
    .then((data)=>{
        console.log(data)
        Snackbar.show({
            text:'Signed in',
            textColor:'white',
            backgroundColor:'green'
        })
    })
    .catch((error)=>{
        console.log(error)
        Snackbar.show({
            text:'Signin failed',
            textColor:"white",
            backgroundColor:'red'
        })
    })
}

export const signOut=()=>async (dispatch)=>{
    auth().signOut()
    .then(()=>{
        Snackbar.show({
            text:'SignOut successfully',
            textColor:"white",
            backgroundColor:'green'
        })
    })
    .catch((error)=>{
        console.log(error)
        Snackbar.show({
            text:'SignOut failed',
            textColor:"white",
            backgroundColor:'red'
        })
    })
}