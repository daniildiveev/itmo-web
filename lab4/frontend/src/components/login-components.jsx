import React, { useState } from 'react';

const UsernameInput = () => {
    return (
        <div id="password-enclosing">
            <input type="text" name="username" id="username-input" placeholder="Nom d'utilisateur" />
        </div>
    )
}

const PasswordInput = () => {
    return  (
        <div id="password-enclosing">
            <input type="text" name="password" id="password-input" placeholder="Mot de passe" />
        </div>
    )
}

export {UsernameInput, PasswordInput};