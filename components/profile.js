import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Keychain from 'react-native-keychain';
import axios from 'axios';
import { CheckToken } from '../CheckToken';
import calls from '../API/calls';
import styles from '../styles/global';
import HeaderInfo from '../helpers/HeaderHelper';
import { GetData } from '../helpers/AxiosHelper';
import Moment from 'moment';
import ProfileInfo from './ProfileInfo';
import BackButton from './BackButton';


function Profile({ navigation }) {

    const [collectionCount, setCollectionCount] = useState(0);
    const [email, setEmail] = useState('');
    const [dateRegistered, setDateRegistered] = useState('');

    const logout = async () => {
        await Keychain.resetGenericPassword(); //clear the passwords/tokens and redirect to auth page i.e. signin and enter an audit to say user has signed out

        const myData = JSON.stringify({
            locationID: 51,
            descriptionID: 71
        });


        axios({
            method: 'POST',
            url: calls.auditentry,
            data: myData,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log('logout error: ' + error);
            })


        navigation.navigate('Auth');
    }

    const GetUserProfileInfo = async () => {

        const myTokenOutput = await CheckToken(); //get return data from helper function
        const myToken = myTokenOutput.token; //get access token to pass into api call to act as middleware

        if (myToken !== null && myToken !== undefined && myToken !== "") {
            const headerInfo = await HeaderInfo(myToken);

            try {
                const GetProfileData = await GetData(calls.profile, 'GET', headerInfo, navigation);

                setCollectionCount(GetProfileData[0].BookCount);
                setEmail(GetProfileData[0].Email);
                setDateRegistered(GetProfileData[0].DateRegistered);

            }
            catch (e) {
                console.log('GetUserProfileInfo: ' + e);

            }

        }

    }

    useEffect(() => {
        GetUserProfileInfo();
    }, []);

    const DeleteAccount = () => {
        //this will run an api request to delete all account data from the tables
        //book, user, reset password etc
        axios.delete(calls.account)
            .then(response => {
                if (response !== null && response !== undefined && response !== "") {
                    //if user deletes account successfully then we can redirect them to the sign in page
                    //and show a brief fade in fade animation\
                    navigation.navigate('Auth');
                    //run function to show fade in fade out animation
                }
            })
            .catch(error => {
                console.log('DeleteAccount error:' + error);
            })
    }

    return (
        <View style={{ height: '100%', backgroundColor: '#2F3C51' }}>
            <View style={{ flex: 0.9 }}>


                <BackButton
                    navigation={navigation}
                    navigateTo='Books'
                />

                <ProfileInfo
                    label="Email"
                    value={email}
                />

                <ProfileInfo
                    label="Number of books in your collection"
                    value={collectionCount}
                />

                <ProfileInfo
                    label="Date registered"
                    value={Moment(dateRegistered).format('DD/MM/YYYY HH:mm')}
                />
            </View>

            <View style={{ justifyContent: 'flex-end', flex: 0.1 }}>
                <TouchableOpacity onPress={logout} >

                    <Text style={[styles.center, styles.font, styles.bottomButtonPadding, styles.white]}>Logout</Text>

                </TouchableOpacity>
            </View>
            {/* <View>
                <TouchableOpacity onPress={() => navigation.navigate('DeleteAccount')} style={{ backgroundColor: 'red' }}>
                    <Text style={[styles.font, styles.center, styles.bottomButtonPadding, styles.white]}>Delete account?</Text>
                </TouchableOpacity>
            </View> */}

        </View>
    );

}

export default Profile;
