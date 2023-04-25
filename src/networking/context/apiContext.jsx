/* implemented all the restful api call - GET, POST, PUT (users, post) */

import React, { createContext, useState, useEffect } from "react";
import https from '../https';
import { Alert } from 'react-native'
import constant from '../../constants/constants';

const APIContext = createContext();

export const APIProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState([]);
  const [userList, setUserList] = useState([]);
  const [userBlogList, setUserBlogList] = useState([]);

/* Method - to call inital API for fetch user Details */

  useEffect(() => {
    fetchDashboard();
  }, []);

  /* Method - to call user API for fetch user List */

  const fetchDashboardList = () => {
    https.get(`users/1/posts`)
      .then(response => {
        if (response.data.length === 0) {
          Alert.alert(JSON.stringify(constant.noData));
          return;
        }
        setUserList(response.data);
      })
      .catch(error => {
        if(error !== undefined || error !== {}){
          Alert.alert(JSON.stringify(error.message));
          return
        }
        Alert.alert(JSON.stringify(constant.serverdownError));
      });
  }

  /* Method - to call user API for fetch user List - used in Blog */

  const fetchBlogDetails = () => {
    https.get(`users/2/posts`)
      .then(response => {
        if (response.data.length === 0) {
          Alert.alert(JSON.stringify(constant.noData));
          return;
        }
        setUserBlogList(response.data);
      })
      .catch(error => {
        if(error !== undefined || error !== {}){
          Alert.alert(JSON.stringify(error.message));
          return
        }
        Alert.alert(JSON.stringify(constant.serverdownError));
      });
  }

  /* Method - to call user API for fetch user Details */

  const fetchDashboard = () => {
    const userApiUrl = https.get(`users/1`)
      .then(response => {
        if (response.data.length === 0) {
          Alert.alert(JSON.stringify(constant.noData));
          return;
        }
        setUserDetails(response.data);
      })
      .catch(error => {
        if(error !== undefined || error !== {}){
          Alert.alert(JSON.stringify(error.message));
          return
        }
        Alert.alert(JSON.stringify(constant.serverdownError));
      });
    Promise.all([userApiUrl]).then(function (response) {
      return response
    }).catch(function (err) {
      if(err !== undefined || err !== {}){
        Alert.alert(JSON.stringify(err.message));
        return
      }
      Alert.alert(JSON.stringify(constant.serverdownError));
    })
  };

    /* Method - to call user post API */

  const updateContentDetail = (detail) => {
    const content = {
      body: detail.body,
      userId: detail.userId,
      id: detail.id,
      title: detail.title
    };
    https.put(`posts/${detail.userId}`, content)
      .then(response => {
        if (response) {
          if (response.data & response.data.length === 0) {
            Alert.alert(JSON.stringify(constant.noData));
            return;
          }
        }
      })
      .catch(error => {
        if(error !== undefined || error !== {}){
          Alert.alert(JSON.stringify(error.message));
          return
        }
        Alert.alert(JSON.stringify(constant.serverdownError));
      });
  };

  /* Added all the methods and properties for access globally */

  return (
    <APIContext.Provider
      value={{
        userDetails,
        userList,
        userBlogList,
        updateContentDetail,
        fetchBlogDetails,
        fetchDashboardList,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};

export default APIContext;
