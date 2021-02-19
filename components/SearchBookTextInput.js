import React from 'react';
import { TextInput } from 'react-native';
import styles from '../styles/global';

//"Search..."

const SearchBookTextInput = ({placeholder,placeholderColor,SearchGoogleBooks }) => {
    return (
        <TextInput
            placeholder={placeholder}
            placeholderTextColor={placeholderColor}
            autoFocus
            autoCapitalize="none"
            onChangeText={SearchGoogleBooks}
            style={styles.searchTextInput}
        />
    )
}

//fontFamily: 'Montserrat-Light', borderBottomWidth: 1, borderColor: 'white', color: 'white', fontSize: 20,

//"#f5f6fa"

export default SearchBookTextInput;