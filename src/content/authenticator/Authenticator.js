import React, { useContext, useState } from 'react'
import { GlobalContext } from '../../contexts/GlobalContext';
import AuthCreateAccountDialog from './auth-forms/AuthCreateAccountDialog'
import AuthDialog from './auth-forms/AuthDialog'
import AuthForgotPasswordDialog from './auth-forms/AuthForgotPasswordDialog'
import AuthPendingDialog from './auth-forms/AuthPendingDialog'
import AuthProfileDialog from './auth-forms/AuthProfileDialog'
import { logout, getUserAttributes } from './useAccounts'
import { findAllByDisplayValue } from '@testing-library/react';


const Authenticator = () => {
    const { state, dispatch } = useContext(GlobalContext);
    console.log(state.isLoggedIn, state.isCreateAccount, state.isForgotPassword, state.hasAccess, state.isEditProfile)

    return (
        <div>
        { !state.isLoggedIn && !state.isCreateAccount && !state.isForgotPassword ? (<AuthDialog />) : null }
        { !state.isLoggedIn && state.isCreateAccount && !state.isForgotPassword ? (<AuthCreateAccountDialog />) : null }
        { !state.isLoggedIn && !state.isCreateAccount && state.isForgotPassword ? (<AuthForgotPasswordDialog />) : null }
        { state.isLoggedIn && !state.hasAccess && !state.isEditProfile ? (<AuthPendingDialog />) : null }
        { state.isLoggedIn && !state.hasAccess && state.isEditProfile ? (<AuthProfileDialog />) : null }
        <p>{ state.isLoggedIn ? "I am logged in!" : "not logged in yet"}</p>
        <button onClick={logout}>logout</button>
        </div>
    )
}


export default Authenticator
