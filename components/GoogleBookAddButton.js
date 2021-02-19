import axios from 'axios';
import React, { useEffect } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { CheckToken } from '../CheckToken';
import HeaderInfo from '../helpers/HeaderHelper';
import calls from '../API/calls';
import styles from '../styles/global';

function GoogleBookAddButton({ title, description, pagination, author, publisher, image, isbnShort, isbnLong }) {


    return (
        <View>
            {/* <TouchableOpacity onPress={AddBookToCollection} style={{ backgroundColor: '#2F3C51' }}>
                <Text style={[styles.center, styles.font, styles.white, styles.bottomButtonPadding]}>Add to my collection</Text>
            </TouchableOpacity> */}
        </View>
    )


}

export default GoogleBookAddButton;