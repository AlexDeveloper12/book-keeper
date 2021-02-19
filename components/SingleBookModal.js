import React, { useState, useEffect } from 'react';

import { Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Modal from 'react-native-modal';

import styles from '../styles/global';
import Loader from '../components/Loader';
import ModalActionButtons from './ModalActionButtons';
import { CheckToken } from '../CheckToken';
import HeaderInfo from '../helpers/HeaderHelper';
import { PostData } from '../helpers/AxiosHelper';
import calls from '../API/calls';
import SingleBookTextEdit from './SingleBookTextEdit';
import ModalStyles from '../styles/ModalStyles';

function SingleBookModal({ navigation, isVisible, BookID, Title, Description, Pagination, Author, Image, Publisher, IShort, ILong, toggleModal, updateBook, loadBooks }) {


    const [bookTitle, setBookTitle] = useState(Title);
    const [bookDescription, setBookDescription] = useState(Description);
    const [bookPagination, setBookPagination] = useState(Pagination);
    const [bookPublisher, setBookPublisher] = useState(Publisher);
    const [bookImage, setBookImage] = useState(Image);
    const [bookIsbnShort, setBookIsbnShort] = useState(IShort);
    const [bookIsbnLong, setBookIsbnLong] = useState(ILong);
    const [bookAuthor, setBookAuthor] = useState(Author);



    const ToggleModal = () => {
        toggleModal();
    }

    const LoadBooks = () => {
        loadBooks();
    }


    const UpdateBook = async () => {


        const tokenOutput = await CheckToken();
        const token = tokenOutput.token;

        const headerInfo = await HeaderInfo(token);


        if (token !== null && token !== undefined && token !== "") {
            //setAnimating(true);

            const myData = JSON.stringify({
                title: bookTitle,
                description: bookDescription,
                pagination: bookPagination,
                publisher: bookPublisher,
                author: bookAuthor,
                image: bookImage,
                isbnShort: bookIsbnShort,
                isbnLong: bookIsbnLong
            });

            //            alert(`${calls.userbook}/${BookID}`)

            try {
                const updateData = await PostData(`${calls.userbook}/${BookID}`, 'PUT', headerInfo, navigation, myData);
                console.log(updateData);

                if (updateData !== false) {
                    //alert(updateData.message);
                    ToggleModal();
                    LoadBooks();
                }
            }
            catch (error) {
                console.log('Error updating book: ' + error);
            }


        }
    }



    return (
        <View style={ModalStyles.viewContainer}>
            <Modal isVisible={isVisible} onBackdropPress={ToggleModal} animationIn="slideInUp" animationOut="slideOutDown" style={[ModalStyles.modalContainer, ModalStyles.singleBookModalHeight]} >

                <ScrollView keyboardShouldPersistTaps='handled' >
                    <View style={{ flex: 0.9 }}>
                        <SingleBookTextEdit
                            value={bookTitle}
                            text={'Title:'}
                            isAutoFocus={true}
                            onChange={setBookTitle}
                            keyboardType='default'
                            numOfLines={1}
                            isMultiLine={false}
                            maxLength={200}
                        />
                        <SingleBookTextEdit
                            value={bookDescription}
                            text={'Description:'}
                            isAutoFocus={false}
                            onChange={setBookDescription}
                            keyboardType='default'
                            numOfLines={2}
                            isMultiLine={true}
                            maxLength={2000}
                        />
                        <SingleBookTextEdit
                            value={String(bookPagination)}
                            text={'Pagination:'}
                            isAutoFocus={false}
                            onChange={setBookPagination}
                            keyboardType='numeric'
                            isMultiLine={false}
                            numOfLines={1}
                            maxLength={4}
                        />
                        <SingleBookTextEdit
                            value={bookPublisher}
                            text={'Publisher:'}
                            isAutoFocus={false}
                            onChange={setBookPublisher}
                            keyboardType='default'
                            isMultiLine={false}
                            numOfLines={1}
                            maxLength={100}
                        />

                        <SingleBookTextEdit
                            value={bookAuthor}
                            text={'Author:'}
                            isAutoFocus={false}
                            onChange={setBookAuthor}
                            keyboardType='default'
                            isMultiLine={false}
                            numOfLines={1}
                            maxLength={100}
                        />

                        <SingleBookTextEdit
                            value={bookImage}
                            text={'Image URL:'}
                            isAutoFocus={false}
                            onChange={setBookImage}
                            keyboardType='default'
                            isMultiLine={true}
                            numOfLines={2}
                            maxLength={200}
                        />


                        <ModalActionButtons
                            okText={'Update'}
                            cancelText={'Cancel'}
                            cancelAction={ToggleModal}
                            okAction={UpdateBook}
                        />

                    </View>


                </ScrollView>


            </Modal>
        </View>
    )

}

export default SingleBookModal;