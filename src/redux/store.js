import { configureStore } from '@reduxjs/toolkit';
import reducer  from '.'

export const store = configureStore({reducer})