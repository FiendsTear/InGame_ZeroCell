import { configureStore, combineReducers } from '@reduxjs/toolkit';
import reducer from './reducer';

const store = configureStore({reducer: reducer});

export default store;