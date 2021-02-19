import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/global';
import ModalStyles from '../styles/ModalStyles';


const ModalActionButtons = (props) => {


    const addAction = () => {
        props.okAction();
        cancelAction();
    }

    const cancelAction = () => {
        props.cancelAction();
    }

    return (
        <View>
            <View style={{ flexDirection: 'row',justifyContent:'flex-end',marginTop:'5%' }}>
                <TouchableOpacity style={ModalStyles.ok} onPress={addAction} >
                    <Text style={[styles.fontbold, styles.white, styles.center, ModalStyles.bottomOptionsPadding]}>{props.okText}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={ModalStyles.cancel} onPress={cancelAction} >
                    <Text style={[styles.fontbold, styles.white, styles.center, ModalStyles.bottomOptionsPadding]}>{props.cancelText}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )


}

export default ModalActionButtons;  