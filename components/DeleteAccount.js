import React, { useEffect, useRef, useState } from 'react';
import { TextInput, View, Text, TouchableOpacity, Button, Animated } from 'react-native';
import styles from '../styles/global';
import { CheckToken } from '../CheckToken';
import axios from 'axios';
import calls from '../API/calls';
import DeleteAccountStyles from '../styles/DeleteAccount';
import BackButton from './BackButton';

function DeleteAccount({ navigation }) {


    const [deleteaccount, setDeleteAccount] = useState('');

    const [fadeAnimation, setFadeAnimation] = useState(new Animated.Value(0));

    const opacity = new Animated.Value(0);

    const fadeIn = () => {
        Animated.timing(fadeAnimation, {
            toValue: 1,
            duration: 2000
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(fadeAnimation, {
            toValue: 0,
            duration: 2000
        }).start();
    };

    const DeleteAccount = async () => {

        if (deleteaccount === 'delete') {
            let tokenOutput = await CheckToken();
            let token = tokenOutput["token"];

            const headerInfo = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };

            axios.delete(calls.account, {
                headers: headerInfo
            })
                .then(response => {
                    alert('Your account has been deleted!');
                    navigation.navigate('Auth');
                })
                .catch(error => {
                    console.log('Error deleting accounts');
                })
        } else {
            alert('Please ensure you enter the word "Delete" into the text box');
        }


    }

    return (
        <View style={styles.container}>

            <BackButton
                navigation={navigation}
                navigateTo='Auth'
            />


            <View style={DeleteAccountStyles.deleteAccountContainer}>
                <Text style={[styles.font, styles.center, styles.white]}>Please enter the word "Delete" into the textbox below and click "Delete Account"</Text>
            </View>


            <View>
                <TextInput placeholder="Enter Delete" onChangeText={(event) => setDeleteAccount(event)} style={{ borderBottomWidth: 1, borderBottomColor: 'white' }} autoFocus />
            </View>


            <View style={{ marginTop: '5%' }}>
                <TouchableOpacity onPress={DeleteAccount}>
                    <Text style={[styles.white, styles.center, styles.font]}>Delete account</Text>
                </TouchableOpacity>
            </View>

            <View style={{ marginTop: 200 }}>

            </View>

            <Animated.View style={{ opacity: fadeAnimation }}>
                <Text style={[styles.font, styles.center], { padding: 10, color: 'red' }}>Your account has been deleted!</Text>
            </Animated.View>
            {/* 
            <View>
                <Button title="fade in " onPress={()=> fadeIn() } />
            </View>
            <View>
                <Button title="fade out " onPress={()=>fadeOut()} />
            </View> */}


        </View>
    )


}

export default DeleteAccount;