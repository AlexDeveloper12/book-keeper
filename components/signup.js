import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import styles from '../styles/global';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope, faKey, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import * as EmailValidator from 'email-validator';
import calls from '../API/calls';
import Loader from './Loader';
import CustomIconTextInput from './CustomIconTextInput';
import CustomBottomButton from './CustomBottomButton';
import { PostData } from '../helpers/AxiosHelper';

function Signup({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [animating, setAnimating] = useState(false);
    const [isEmailEditable, setEmailEditable] = useState(true);
    const [isPasswordEditable, setPasswordEditable] = useState(true);
    const [isReEnterPasswordEditable, setReEnterPasswordEditable] = useState(true);
    const [isSignUpDisabled, setSignUpDisabled] = useState(false);

    const SignUp = async () => {
        let errorString = '';

        setAnimating(true);

        const emailValid = EmailValidator.validate(email);

        if(emailValid===false && email.length>0){
            errorString+='Please ensure you enter a valid email address\n';
        }

        if (email.length === 0) {
            errorString += 'Please enter an email address\n';
        }

        if (password.length === 0) {
            errorString += 'Please enter a password\n';
        }

        if (password.length > 0 && password.length < 7) {
            errorString += 'Please ensure your password is 7 characters or longer\n';
        }


        if (reEnterPassword.length === 0) {
            errorString += 'Please re-enter your password\n';
        }

        if (reEnterPassword.length > 0 && reEnterPassword.length < 7) {
            errorString += 'Please ensure your Re-enter Password is 7 characters or longer\n';
        }

        if (password !== reEnterPassword) {
            errorString += 'Please ensure that both your passwords entered are the same\n';
        }

        if (errorString === '') {

            setEmailEditable(false);
            setPasswordEditable(false);
            setReEnterPasswordEditable(false);
            setSignUpDisabled(true);


            const myData = JSON.stringify({
                email: email,
                password: password
            });

            const headerInfo = {
                'Content-Type': 'application/json'
            };

            const responseData = await PostData(calls.signup, 'POST', headerInfo, navigation, myData);

            console.log(responseData);


            alert('Verification email sent. Please check your inbox.');
            setAnimating(false);

        } else {
            alert(errorString);
            setAnimating(false);
        }


    }


    return (
        <View style={styles.container}>
            <View style={styles.innerContainer} >
                <FontAwesomeIcon icon={faBookOpen} size={80} style={{ color: 'white' }} />
                <Text style={[styles.bookText, styles.white, styles.opacity]}>Books</Text>
            </View>

            <CustomIconTextInput
                customIcon={faEnvelope}
                placeholder={'Email'}
                customOnChange={event => setEmail(event)}
                isAutofocus={true}
                isEditable={isEmailEditable}
                isPassword={false}

            />

            <CustomIconTextInput
                customIcon={faKey}
                placeholder={'Password'}
                customOnChange={event => setPassword(event)}
                isAutofocus={false}
                isEditable={isPasswordEditable}
                isPassword={true}
            />

            <CustomIconTextInput
                customIcon={faKey}
                placeholder={'Re-enter password'}
                customOnChange={event => setReEnterPassword(event)}
                isAutofocus={false}
                isEditable={isReEnterPasswordEditable}
                isPassword={true}
            />


            <View style={styles.bottomButton}>
                <TouchableOpacity onPress={SignUp} disabled={isSignUpDisabled}>
                    <Text style={[styles.bottomButtonPadding, styles.white, styles.font, styles.center, styles.bottomButtonFontSize, styles.buttonBGColour]}>Signup</Text>
                </TouchableOpacity>

            </View>

            <CustomBottomButton
                text={'Signin'}
                navigateTo={'Signin'}
                navigation={navigation}
            />

            <Loader animating={animating} />

        </View>


    )
}

export default Signup;