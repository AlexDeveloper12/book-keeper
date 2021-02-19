
import React from 'react';
import { TextInput, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import styles from '../styles/global';

function CustomIconTextInput({ customIcon, placeholder, customOnChange, isAutofocus,isEditable,isPassword }) {

    return (
        <View style={styles.inputContainer}>
            <FontAwesomeIcon
                icon={customIcon}
                size={20}
                color={'white'}
                style={styles.icon}
            />
            <TextInput
                placeholder={placeholder}
                style={styles.textinput}
                placeholderTextColor={'#f5f6fa'}
                autoCapitalize={'none'}
                onChangeText={(event) => customOnChange(event)}
                secureTextEntry={isPassword ? true : false}
                autoFocus={isAutofocus === true ? true : false}
                editable={isEditable}
            />
        </View>
    )


}


export default CustomIconTextInput;