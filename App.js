import AppNavigator from './src/AppNavigator';
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from './src/redux';
import { Provider } from 'react-redux';
const store = configureStore({
    reducer: {
        global: globalReducer,
    },
});
export default function App() {
    return <>
        <Provider store={store}>
            <AppNavigator />
        </Provider>
    </>
}