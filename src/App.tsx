import { useSelector } from 'react-redux';

import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, StyledEngineProvider } from '@material-ui/core';

// routing
import Routes from 'routes';

// store
import { DefaultRootStateProps } from 'types';

// defaultTheme
import themes from 'themes';

// project imports
import Locales from 'ui-component/Locales';
import NavigationScroll from 'layout/NavigationScroll';
// import RTLLayout from 'ui-component/RTLLayout';
import Snackbar from 'ui-component/extended/Snackbar';

// auth provider
import { FirebaseProvider } from 'contexts/FirebaseContext';
// import {JWTProvider} from 'contexts/JWTContext';
// import {Auth0Provider} from 'contexts/Auth0Context';

// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state: DefaultRootStateProps) => state.customization);

    return (
        <StyledEngineProvider injectFirst>
                <ThemeProvider theme={themes(customization)}>
                    <CssBaseline />
                    {/* RTL layout */}
                    {/* <RTLLayout> */}
                    <Locales>
                        <NavigationScroll>
                            <FirebaseProvider>
                                <>
                                    <Routes />
                                    <Snackbar />
                                </>
                            </FirebaseProvider>
                        </NavigationScroll>
                    </Locales>
                    {/* </RTLLayout> */}
                </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
