import { call, put, takeEvery,takeLatest } from 'redux-saga/effects';
import axios from 'react-native-axios';
import { setUserDetails,getAuthSuccess,getAuthFailure,setProfileDetaiils,setFirstTime } from '../../store/UserSlice';
import { EndPoint } from '../../utils/EndPoint';
import { Alert } from 'react-native';
import { API } from '../apis/UserService';


function* workerGetUserFetch(action){
    try{
        const response = yield call(API.userLogin,action.payload);
        if (response.status >= 200 && response.status < 300) {
           
            yield put(setUserDetails(response.data.data))
            yield put(setProfileDetaiils(response.data.data.user))
            yield put(getAuthSuccess())
            yield put(setFirstTime())
          } else {
            throw response;
        }
    }catch(error){

        
        Alert.alert('Oops', error.message);
        yield put(getAuthFailure(error?.response?.data?.message ?? 'Something Went Wrong'))
    }
   
   
}
function* workerRegisterUser(action){
    try{
        
        const response = yield call(API.userRegister,action.payload);
        console.log(action.payload)
        if (response.status >= 200 && response.status < 300) {
            yield put(setUserDetails(response.data.data))
            yield put(setProfileDetaiils(response.data.data.user)),
            yield put(getAuthSuccess())
            
          } else {
            throw response;
        }
       
    }catch(error){
        Alert.alert('Oops', error.message);
        yield put(getAuthFailure(error?.response?.data?.message ?? 'Something Went Wrong'))
    }
}

function* workerUpdateUser(action){
    try{
        
        const response = yield call(API.userUpdate,action.payload);
       
        if (response.status >= 200 && response.status < 300) {
           // yield put(setProfileDetaiils(response.data.data))
            //yield put(getAuthSuccess())
          } else {
            throw response;
        }
       
    }catch(error){
        Alert.alert('Oops', error.message);
        yield put(getAuthFailure(error?.response?.data?.message ?? 'Something Went Wrong'))
    }
}

function* userSaga(){
    yield takeLatest("user/getAuthFetch",workerGetUserFetch)
    yield takeLatest("user/registerAuthUser",workerRegisterUser)
    //yield takeLatest("user/updateAuthUser",workerUpdateUser)
    
}

export default userSaga;