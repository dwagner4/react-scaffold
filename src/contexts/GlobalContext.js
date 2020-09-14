import React from 'react';

export const GlobalContext = React.createContext();

export const initialGlobalState = {
  userinfo: null,
  ui: {showSidebar: true}
};

export function globalReducer(state, action) {
  switch (action.type) {
    case 'SET_IS_LOGGED_IN':
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case 'SET_EDIT_PROFILE':
      return {
        ...state,
        isEditProfile: action.payload,
      };
    case 'SET_HAS_ACCESS':
      return {
        ...state,
        hasAccess: action.payload,
      };
    case 'SET_CREATE_ACCOUNT':
      return {
        ...state,
        isCreateAccount: action.payload,
      };
    case 'SET_FORGOT_PASSWORD':
        return {
          ...state,
          isForgotPassword: action.payload,
        };
    case 'SET_RESET_PASSWORD':
      return {
        ...state,
        isResetPassword: action.payload,
      };
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        ui: {
          ...state.ui,
          showSidebar: action.payload.showSidebar,
        },
      };
    default:
      alert(action.type, 'error 99');
      return state;
  }
}
