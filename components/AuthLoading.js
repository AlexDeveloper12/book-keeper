import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import { CheckToken } from '../CheckToken';

function AuthLoading({ navigation }) {

  const [animating, setAnimating] = useState(false);

  const DetermineScreenNavigation = async () => {
    setAnimating(true);

    const myTokenOutput = await CheckToken();
    const myToken = myTokenOutput.token;

    if (myToken !== null && myToken !== undefined && myToken !== '') {
        navigation.navigate('App');
    } else {
      navigation.navigate('Auth');
    }
  };

  useEffect(() => {
    DetermineScreenNavigation();
  }, []);

  return (<Loader animating={animating} />);

}

export default AuthLoading;
