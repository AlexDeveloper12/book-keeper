import React from 'react';

import { Text, View } from 'react-native';

import styles from '../styles/global';

const ProfileInfo = ({ label, value }) => {
    return (
        <View style={{ marginTop: '20%' }}>
            <Text style={[styles.font, styles.white]}>
                {label}: {value}
            </Text>
        </View>
    )

}

export default ProfileInfo;