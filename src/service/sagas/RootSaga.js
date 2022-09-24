import { spawn } from 'redux-saga/effects';
import userSaga from './userSaga';

export function* rootSaga() {
    yield spawn(userSaga);
   
}
  