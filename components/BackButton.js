import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/global';


const BackButton = ({ navigation, navigateTo }) => {
    return (

        <View style={styles.leftChevronContainer}>
            <TouchableOpacity onPress={() => navigation.navigate(navigateTo)}>
                <FontAwesomeIcon
                    icon={faChevronCircleLeft}
                    size={25}
                    style={styles.white}

                />
            </TouchableOpacity>

        </View>
    );
};

export default BackButton;
