import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import calls from '../API/calls';
import styles from '../styles/global';

import CustomUserBooksCard from './CustomUserBooksCard';
import Loader from './Loader';
import { CheckToken } from '../CheckToken';
import HeaderHelper from '../helpers/HeaderHelper';
import { GetData } from '../helpers/AxiosHelper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCog, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import AddBookModal from './AddBookModal';

function Userbooks({ navigation }) {

    const [animating, setAnimating] = useState(false);
    const [books, setBooks] = useState([]);
    const [isListRefresh, setListRefresh] = useState(false);
    const [isAddBookVisible, setAddBookVisible] = useState(false);
    const [isConnected, setConnected] = useState(true);


    const GetBooks = async () => {
        setAnimating(true);
        setListRefresh(true);

        try {
            const myTokenOutput = await CheckToken();
            const myToken = myTokenOutput.token;

            const headerInfo = await HeaderHelper(myToken);

            const data = await GetData(calls.userbooks, 'GET', headerInfo, navigation);
            console.log('inside GetBooks');

            if (data.length > 0) {
                setBooks(data);
                setListRefresh(false);
            }
            setAnimating(false);
            setListRefresh(false);
        }
        catch (e) {
            console.log('GetBooks Error: ' + e);
            setAnimating(false);
        }

    }

    const RenderItem = ({ item }) => {
        const castFavAsBool = item.isFavourite !== undefined ? item.isFavourite.data[0] === 1 ? true : false : null;

        return (
            <CustomUserBooksCard
                navigation={navigation}
                Description={item.Description}
                Title={item.Title}
                Image={item.Image}
                BookID={item.BookID}
                LoadBooks={GetBooks}
                Publisher={item.Publisher}
                Pagination={item.Pagination}
                favourite={castFavAsBool}
                Author={item.Author}
                ISBNShort={item.ISBNShort}
                ISBNLong={item.ISBNLong}
            />
        )
    }




    const keyExtractor = (item, index) => String(item.BookID);

    useEffect(() => {
        GetBooks()
    }, []);

    const toggleAddBook = () => {
        setAddBookVisible(!isAddBookVisible);
    }





    return (
        <View style={{ height: '100%', backgroundColor: '#2F3C51' }}>
            


            <View style={{ paddingTop: '20%' }}>

                <View style={{ justifyContent:'space-evenly', alignItems: 'center',flexDirection:'row', }}>
                    <TouchableOpacity onPress={toggleAddBook}>
                        <FontAwesomeIcon icon={faPlusCircle} size={30} color={'white'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('Profile') }>
                        <FontAwesomeIcon icon={faCog} size={30} color={'white'}/>
                    </TouchableOpacity>
                </View>


                {books.length > 0 ? <FlatList
                    keyboardShouldPersistTaps='always'
                    data={books}
                    renderItem={RenderItem}
                    keyExtractor={keyExtractor}
                    refreshing={isListRefresh}
                    onRefresh={GetBooks}
                    extraData={books}
                    style={{ height: '100%' }} /> :
                    <Text style={[styles.center, styles.font, styles.white]}>No books in your collection</Text>}

                <Loader
                    animating={animating}
                />

                <AddBookModal
                    isVisible={isAddBookVisible}
                    toggle={toggleAddBook}
                    LoadBooks={GetBooks}
                />



            </View>

        </View>


    )


}



export default Userbooks;