import { createStore } from 'redux';
import themeReducer from '../redux/themeReducer';

const store = createStore(themeReducer);

export default store;
