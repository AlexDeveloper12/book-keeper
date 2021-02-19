import React from 'react';

import { Text, View, TextInput } from 'react-native';
import styles from '../styles/global';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const SingleBookTextEdit = ({ text, value, isAutoFocus, onChange, keyboardType,isMultiLine,numOfLines,maxLength }) => {

    return (
        <View style={{ flexDirection: 'row', marginTop:hp('6%')}}>

            <TextInput placeholder={text} value={value} style={[styles.font,styles.wrap,styles.singleBookBorder,styles.fullWidth]} autoFocus={isAutoFocus ? true : false} maxLength={maxLength} multiline={isMultiLine?true:false} numberOfLines={numOfLines} onChangeText={onChange} keyboardType={keyboardType} />
        </View>
    )


}

export default SingleBookTextEdit;