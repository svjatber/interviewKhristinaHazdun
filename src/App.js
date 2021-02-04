import './App.css';
import {useEffect, useState} from "react";
import React from 'react'
import fireB from "./file";
import User from "./component/UserComp.js";
import Login from "./component/Login.js";


const App = () => {

  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passError, setPassError] = useState('')
  const [hasAccount, setHasAccount ] = useState(true)
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');



  const removeInputs = () => { // стирання інпутів
    setName('')
    setSurname('')
    setEmail('')
    setPassword('')
  }
  const removeError = () => { // стирання помилок
    setEmailError('')
    setPassError('')
  }


  const handleLogin = () => { // логінізація
    removeError()
    fireB
        .auth()
        .signInWithEmailAndPassword(email,password)
        .catch((err) =>{
              switch (err.code){
                case 'auth/invalid-email':
                case 'auth/user-disabled':
                case 'auth/user-not-found':
                  setEmailError(err.message)
                case 'auth/wrong-password':
                  setPassError(err.message)
              }
            }
        )
  }

  const handleSignUp = () =>{ // реєстрація
    removeError()
    fireB
        .auth()
        .createUserWithEmailAndPassword(email,password)
        .catch((err) =>{
              switch (err.code){
                case 'auth/email-already-in-use':
                case 'auth/invalid-email':
                  setEmailError(err.message)
                case 'auth/weak-password':
                  setPassError(err.message)
              }
            }
        )
  }

  const handleLogout = () => { // логаут
    fireB.auth().signOut()

  }

  const authWatcher = () => { // наявність юзера
    fireB.auth().onAuthStateChanged(user => {
      if(user){
        removeInputs()
        setUser(user)

      }else{
        setUser('')
      }
    })
  }

  useEffect(()=>{
    authWatcher()

  }, [])

  return (

      <div>
        <h1>Завдання з 2 таймерами, другий запускається в другій вкладці, поки перший активний</h1>
        {user ? (
            <User handleLogout={handleLogout}
                  user={user}
                  name={name}
                  surname={surname}
            />
        ) : (
            <Login
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleLogin={handleLogin}
                handleSignUp={handleSignUp}
                hasAccount = {hasAccount}
                setHasAccount = {setHasAccount}
                emailError={emailError}
                passError={passError}
                setEmailError={setEmailError}
                setPassError={setPassError}
                name={name}
                setName={setName}
                surname={surname}
                setSurname={setSurname}
            />
        )
        }


      </div>

  )

}

export default App;
