import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
firebase.initializeApp(firebaseConfig);

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const handleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(function (result) {
                const {displayName, email, photoURL} = result.user;
                const newUser = {
                    name: displayName,
                    email: email,
                    photo: photoURL
                };
                setLoggedInUser(newUser);
                history.replace(from);
            })
            .catch(function (error) {
                alert(error);
            });
    };

    return (
        <div className="app">
            <h1>This is Login Page</h1>
            <button onClick={handleSignIn}>Google</button>
        </div>
    );
};

export default Login;