import * as rConst from "reduxConstants";

export var startLogin = (username) =>{
  const users = JSON.parse(process.env.USERS)
  if (!users[username]){
    return false
  }else{
    return users[username];
  }
}

var addSession = (session) => {
  return {
    type: rConst.ADD_SESSION,
    session
  }
}

export var startAddSession = (sessionInfo) => {
  return (dispatch, getState) => {
    dispatch(addSession(sessionInfo));
    return true
  }
}