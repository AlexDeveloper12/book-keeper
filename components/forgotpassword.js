import React, { useState } from 'react';
import {
  Text, View, TextInput, TouchableOpacity,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { withNavigation } from 'react-navigation';
import * as EmailValidator from 'email-validator';


import styles from '../styles/global';
import forgotpassword from '../styles/forgotpassword';
import calls from '../API/calls';
import Loader from './Loader';
import BackButton from '../components/BackButton';

function ForgotPassword({ navigation }) {
  const [forgetPassword, setForgetPassword] = useState('');
  const [animating, setAnimating] = useState(false);
  const [isPasswordDisabled, setPasswordDisabled] = useState(false);

  const ResetPassword = async () => {
    let errorString = '';

    let validateEmail = EmailValidator.validate(forgetPassword);

    const headerInfo = {
      'Content-Type': 'application/json',
    };

    const myData = JSON.stringify({
      email: forgetPassword,
    });

    if (forgetPassword.length === 0) {
      errorString += 'Please enter an email address\n';
    }

    if (validateEmail === false) {
      errorString += 'Please ensure you enter a valid email address\n';
    }


    if (errorString === '') {

      setAnimating(true);
      setPasswordDisabled(true);

      axios({
        method: 'POST',
        data: myData,
        url: calls.resetpassword,
        headers: headerInfo,
      })
        .then((response) => {
          // if there is an account with this email and email has been sent successfully then show success alert
          alert(response.data.message);
          setAnimating(false);
          setPasswordDisabled(false);
        })
        .catch((error) => {
          console.log(`ResetPassword error: ${error}`);
          setAnimating(false);
          setPasswordDisabled(false);
        });
    } else {
      alert(errorString);
      setAnimating(false);
      setPasswordDisabled(false);
    }

  };

  return (
    <View style={styles.container}>

      <BackButton
        navigation={navigation}
        navigateTo='Profile'
      />


      <View style={forgotpassword.innerContainer}>

        <View style={styles.inputContainer} />

        <View style={styles.inputContainer}>
          <FontAwesomeIcon icon={faKey} size={15} style={[styles.white, styles.iconMargin]} />

          <TextInput
            style={[styles.textinput, styles.white]}
            autoCapitalize="none"
            onChangeText={(event) => setForgetPassword(event)}
            placeholder="Please enter email associated with your account"
            placeholderTextColor="white"
            autoFocus
          />
        </View>

        <View>
          <TouchableOpacity onPress={ResetPassword} style={styles.bottomButton}>
            <Text
              style={[styles.bottomButtonPadding, styles.white, styles.font, styles.center, styles.bottomButtonFontSize, styles.buttonBGColour]}>
              Reset Password
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
          <Loader animating={animating} />
        </View>

      </View>

    </View>
  );
}

export default withNavigation(ForgotPassword);
