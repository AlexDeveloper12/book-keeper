import React, { useState } from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import ModalStyles from '../styles/ModalStyles';
import AddBookTextInput from './AddBookTextInput';
import ModalActionButtons from './ModalActionButtons';
import calls from '../API/calls';
import { PostData } from '../helpers/AxiosHelper';
import { CheckToken } from '../CheckToken';
import HeaderInfo from '../helpers/HeaderHelper';

function AddBookModal({ isVisible, toggle, LoadBooks }) {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pagination, setPagination] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [image, setImage] = useState('');
  const [isbnShort, setIsbnShort] = useState('');
  const [isbnLong, setIsbnLong] = useState('');

  const Add = async () => {
    let errorString = '';

    if (title.length === 0) {
      errorString += 'Please enter a title\n';
    }

    if (description.length === 0) {
      errorString += 'Please enter a description\n';
    }

    if (pagination.length === 0) {
      errorString += 'Please enter a pagination\n';
    }

    if (author.length === 0) {
      errorString += 'Please enter a author\n';
    }

    if (publisher.length === 0) {
      errorString += 'Please enter a publisher\n';
    }

    if (image.length === 0) {
      errorString += 'Please enter an image URL\n';
    }

    if (errorString === '') {
      //AddBook(title, description, pagination, author, publisher, image, isbnShort, isbnLong);


      const tokenOutput = await CheckToken();
      const token = tokenOutput.token;

      const headerInfo = await HeaderInfo(token);

      const myData = JSON.stringify({
        title: title,
        description: description,
        pagination: pagination,
        author: author,
        publisher: publisher,
        image: image,
        isbnShort: isbnShort,
        isbnLong: isbnLong
      });

      const responseData = await PostData(calls.userbook, 'POST', headerInfo, null, myData);

      toggle();
      LoadBooks();
    } else {
      alert(errorString)
    }

  };

  return (

    <View>
      <Modal isVisible={isVisible} style={[ModalStyles.modalContainer, ModalStyles.singleBookModalHeight]} onBackdropPress={toggle}>

        <AddBookTextInput
          placeholder='Title'
          isAutoFocus={true}
          maxlength={100}
          isMultiline={false}
          onchangeMethod={setTitle}
        />

        <AddBookTextInput
          placeholder='Description'
          isAutoFocus={false}
          maxlength={500}
          isMultiline={true}
          onchangeMethod={setDescription}
        />

        <AddBookTextInput
          placeholder='Pagination'
          isAutoFocus={false}
          keyboardType='numeric'
          isMultiline={false}
          onchangeMethod={setPagination}
        />

        <AddBookTextInput
          placeholder='Publisher'
          isAutoFocus={false}
          isMultiline={false}
          onchangeMethod={setPublisher}
        />


        <AddBookTextInput
          placeholder='Author'
          isAutoFocus={false}
          maxlength={500}
          isMultiline={false}
          onchangeMethod={setAuthor}
        />

        <AddBookTextInput
          placeholder='Image URL'
          isAutoFocus={false}
          maxlength={500}
          isMultiline={true}
          onchangeMethod={setImage}
        />

        <ModalActionButtons
          okText='Add'
          cancelText='Cancel'
          okAction={Add}
          cancelAction={toggle}
        />
      </Modal>
    </View>
  );

}

export default AddBookModal;
