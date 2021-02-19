import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from '../styles/global';

const CustomBottomButton = ({ text, navigation, navigateTo }) => {
    return (
        <View style={{ marginTop: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate(navigateTo)}>
                <Text style={[styles.white, styles.font, styles.center, styles.opacity]} >{text}</Text>
            </TouchableOpacity>

        </View>
    )
}

export default CustomBottomButton;