import React from 'react';
import styles from '../styles/global';

import { View, Text, TextInput } from 'react-native';

const AddBookTextInput = ({ placeholder, onchangeValue, maxlength, isMultiline, onchangeMethod, isAutoFocus,keyboardType }) => {


    return (
        <View style={{ flexDirection: 'row',padding:'2%',flex:0.1 }}>
            <TextInput
                placeholder={placeholder}
                multiline={isMultiline}
                onChangeText={(event)=>onchangeMethod(event)}
                maxLength={maxlength}
                value={onchangeValue}
                autoFocus={isAutoFocus}
                keyboardType={keyboardType===undefined?'default':keyboardType}
                style={styles.font,{borderBottomColor:'black',borderBottomWidth:1,width:'100%'}}
            />
        </View>
    )
}

export default AddBookTextInput;