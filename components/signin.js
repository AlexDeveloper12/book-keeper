import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBookOpen, faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/global';
import axios from 'axios';
import calls from '../API/calls';
import * as Keychain from 'react-native-keychain';
import Loader from './Loader';
import CustomIconTextInput from './CustomIconTextInput';
import CustomBottomButton from './CustomBottomButton';


function Signin({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [animating, setAnimating] = useState(false);
    const [emailEditable, setEmailEditable] = useState(true);
    const [passwordEditable, setPasswordEditable] = useState(true);
    const [signInEditable, setSignInEditable] = useState(false);

    const UserSignIn = async () => {
        const headerInfo = {
            'Content-Type': 'application/json'
        };

        let errorString = '';

        let myData = JSON.stringify({
            email: email,
            password: password
        });

        setAnimating(true);



        if (email.length === 0) {
            errorString += 'Please enter an email address\n';
        }

        if (password.length === 0) {
            errorString += 'Please enter a password\n';
        }

        if (errorString === '') {

            setEmailEditable(false);
            setPasswordEditable(false);
            setSignInEditable(true);
            //disable other controls while the app is in the process of signing in user

            const signInResponse = await axios({
                method: 'POST',
                url: calls.signin,
                data: myData,
                headers: headerInfo
            });

            console.log(signInResponse);

            if (signInResponse.data.status === 200) {
                console.log(signInResponse.data);
                const token = signInResponse.data.message.token;
                const refreshToken = signInResponse.data.message.refreshToken;
                const tokenData = {
                    token: token,
                    refreshToken: refreshToken
                };

                await Keychain.setGenericPassword('token', JSON.stringify(tokenData)); //set keychain object

                setAnimating(false);
                setEmailEditable(true);
                setPasswordEditable(true);
                setSignInEditable(false);
                navigation.navigate('Books');
            } else if (signInResponse.data.status === 401) {
                alert(signInResponse.data.message);
                setAnimating(false);
                setEmailEditable(true);
                setPasswordEditable(true);
                setSignInEditable(false);
            }
            else {
                console.log(signInResponse);
            }

        }
        else {
            alert(errorString);
            setAnimating(false);
        }
    }

    return (
        <View style={styles.container} >
            <View style={styles.innerContainer} >
                <FontAwesomeIcon icon={faBookOpen} size={80} style={styles.white} />
                <Text style={[styles.bookText, styles.white, styles.opacity]}>Books</Text>
            </View>

            <CustomIconTextInput
                customIcon={faEnvelope}
                placeholder={'Email'}
                customOnChange={(event) => setEmail(event)}
                isAutofocus={true}
                isEditable={emailEditable}
                isPassword={false}

            />

            <CustomIconTextInput
                customIcon={faKey}
                placeholder={'Password'}
                customOnChange={(event) => setPassword(event)}
                isAutofocus={false}
                isEditable={passwordEditable}
                isPassword={true}
            />


            <View>
                <TouchableOpacity style={styles.bottomButton} onPress={UserSignIn} disabled={signInEditable}>
                    <Text style={[styles.bottomButtonPadding, styles.white, styles.font, styles.center, styles.bottomButtonFontSize, styles.buttonBGColour]} >Signin</Text>
                </TouchableOpacity>

            </View>

            <CustomBottomButton
                text={'Forgot password?'}
                navigateTo={'ForgotPassword'}
                navigation={navigation}
            />


            <CustomBottomButton
                text={'Signup'}
                navigateTo={'Signup'}
                navigation={navigation}

            />

            <Loader animating={animating} />

        </View>
    )



}

export default Signin;