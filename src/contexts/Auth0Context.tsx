import React, { createContext, useEffect, useReducer } from 'react';

// third-party
import { Auth0Client } from '@auth0/auth0-spa-js';

// reducer - state management
import { ACCOUNT_INITIALIZE, LOGIN, LOGOUT } from 'store/actions';
import accountReducer from 'store/accountReducer';

// project imports
import config from 'config';
import Loader from 'ui-component/Loader';
import { KeyedObject, initialLoginContextProps } from 'types';

// constant
let auth0Server: Auth0Client;

const initialState: initialLoginContextProps = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

// ==============================|| AUTH0 CONTEXT & PROVIDER ||============================== //

const Auth0Context = createContext({
    ...initialState,
    popupLogin: (s?: KeyedObject) => Promise.resolve(),
    logout: () => {}
});

export const Auth0Provider = ({ children }: { children: React.ReactElement }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);

    const popupLogin = async (options?: KeyedObject) => {
        await auth0Server.loginWithPopup(options);
        const isLoggedIn = await auth0Server.isAuthenticated();

        if (isLoggedIn) {
            const user = await auth0Server.getUser();
            dispatch({
                type: LOGIN,
                payload: {
                    ...state,
                    user: {
                        id: user?.sub,
                        avatar: user?.picture,
                        email: user?.email,
                        name: user?.name,
                        tier: 'Premium'
                    }
                }
            });
        }
    };

    const logout = () => {
        auth0Server.logout();

        dispatch({
            type: LOGOUT
        });
    };

    useEffect(() => {
        const init = async () => {
            try {
                auth0Server = new Auth0Client({
                    redirect_uri: window.location.origin,
                    ...config.auth0
                });

                await auth0Server.checkSession();
                const isLoggedIn = await auth0Server.isAuthenticated();

                if (isLoggedIn) {
                    const user = await auth0Server.getUser();

                    dispatch({
                        type: ACCOUNT_INITIALIZE,
                        payload: {
                            ...state,
                            isLoggedIn: true,
                            user: {
                                id: user?.sub,
                                email: user?.email
                            }
                        }
                    });
                } else {
                    dispatch({
                        type: ACCOUNT_INITIALIZE,
                        payload: {
                            ...state,
                            isLoggedIn: false,
                            user: null
                        }
                    });
                }
            } catch (err) {
                dispatch({
                    type: ACCOUNT_INITIALIZE,
                    payload: {
                        ...state,
                        isLoggedIn: false,
                        user: null
                    }
                });
            }
        };

        init();
    }, []);

    if (!state.isInitialized) {
        return <Loader />;
    }

    return <Auth0Context.Provider value={{ ...state, popupLogin, logout }}>{children}</Auth0Context.Provider>;
};

export default Auth0Context;
