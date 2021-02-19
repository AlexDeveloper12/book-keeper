import React from 'react';

import { Text, View} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-native-modal';
import styles from '../styles/global';
import ModalStyles from '../styles/ModalStyles';
import ModalActionButtons from '../components/ModalActionButtons';


function DeleteBookModal({ isVisible, DeleteBook, ToggleModal, BookID, LoadBooks,animationStatus }) {

    const DeleteSingleBook = () => {
        DeleteBook(BookID);
        ToggleModal();
        LoadBooks();
    };


    return (
        <View style={ModalStyles.viewContainer}>
            <Modal
                animationIn="slideInUp"
                animationOut="slideOutDown"
                swipeDirection="right"
                isVisible={isVisible}
                onBackdropPress={ToggleModal}
                style={[ModalStyles.modalContainer,ModalStyles.deleteBookModalHeight]}>

                <View style={{flexDirection:'row',justifyContent:'center'}}>
                    <FontAwesomeIcon icon={faTimesCircle} size={30}/>
                </View>

                <View style={ModalStyles.innerContainer}>
                    
                    <Text style={[styles.center, styles.font]}>Are you sure you want to delete this book from your collection?</Text>
                </View>

                <ModalActionButtons okText={'Delete'} cancelText={'Cancel'} okAction={DeleteSingleBook} cancelAction={ToggleModal}/>
            </Modal>
        </View>
    )

}

export default DeleteBookModal;