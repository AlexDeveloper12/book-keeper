import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, Animated } from 'react-native';
import { Card } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import styles from '../styles/global';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import { CheckToken } from '../CheckToken';
import calls from '../API/calls';
import DeleteBookModal from '../components/DeleteBookModal';
import SingleBookModal from '../components/SingleBookModal';


Icon.loadFont();

function CustomUserBooksCard({ Title, Image, Description, BookID, navigation, LoadBooks, Pagination, Publisher, Author, ISBNShort, ISBNLong, favourite, updateBook }) {

  const [favouriteBook, setFavouriteBook] = useState(false);

  const [isDeleteVisible, setDeleteVisible] = useState(false);

  const [isAnimationVisible, setAnimationVisible] = useState(new Animated.Value(0));

  const [isEditVisible, setEditVisible] = useState(false);

  useEffect(() => {
    setFavouriteBook(favourite);

    console.log(favouriteBook);

    console.log('CustomUserBooksCard');

    console.log(Pagination);
    console.log(Publisher);


  }, []);

  const deleteAnimation = () => {
    Animated.timing(isAnimationVisible, {
      toValue: 1,
      duration: 2000
    }).start(() => {
      Animated.timing(isAnimationVisible, {
        toValue: 0,
        duration: 2000
      }).start();
    });

  }


  const DeleteBook = async () => {

    console.log(BookID);

    const myTokenOutput = await CheckToken();
    const myToken = myTokenOutput["token"];

    console.log(myToken);
    console.log(myTokenOutput);

    if (myToken !== null && myToken !== undefined && myToken !== "") {

      const headerInfo = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${myToken}`
      };

      axios.delete(`${calls.userbook}/${BookID}`, {
        headers: headerInfo
      })
        .then(response => {
          if (response !== null && response !== undefined && response !== "") {
            //alert(response.data.message);
            LoadBooks();
            deleteAnimation();

          }
        })
        .catch(error => {
          console.log('DeleteBook error: ' + error);
          if (error.response.data.error === 401) {
            //unauthorized error code so redirect
            navigation.navigate('Auth');
          }
        })
    }
  }




  const AddToFavourites = async () => {
    const myTokenOutput = await CheckToken();
    const myToken = myTokenOutput.token;

    if (myToken !== null && myToken !== undefined && myToken !== "") {

      let headerInfo = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${myToken}`
      }
      axios.put(`${calls.favourite}/${BookID}`, {
        headers: headerInfo
      })
        .then(response => {
          if (response !== null && response !== undefined && response !== "") {
            setFavouriteBook(!favouriteBook);
          }
        })
        .catch(error => {
          console.log('AddToFavourites error: ' + error);
          console.log(`${calls.favourite}/${BookID}`)
        })
    }
  }

  const ToggleModal = () => {
    setDeleteVisible(!isDeleteVisible);
  }

  const ToggleEditModal = () => {
    setEditVisible(!isEditVisible);
  }


  return (
    <View key={String(BookID)} style={{ flex: 1 }}>
      <TouchableOpacity
        onLongPress={() => setDeleteVisible(true)}
        onPress={ToggleEditModal}
      >
        <Card>
          <Card.Title>
            <Text style={[styles.center, styles.font]}>{Title}</Text>
          </Card.Title>
          <FastImage source={{uri:Image}} style={{width:wp('85%'),height:hp('28%')}}/>

          <View style={{paddingTop:hp('1%')}}>
            <Text style={[styles.font]}>{Description}</Text>
          </View>
          <View style={{paddingTop:hp('1%')}}>
            <Text style={[styles.font]}>
              Number of pages:
            {Pagination}
            </Text>
          </View>
          <View style={{paddingTop:hp('1%')}}>
            <Text style={[styles.font]}>
              Publisher:
            {Publisher}
            </Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center',paddingTop:hp('1%') }}>
            {/* <Rating onStartRating ratingCount={1} startingValue={0} readonly={false}  onFinishRating={()=>alert('finished rating')} ratingBackgroundColor={'yellow'} ratingColor={'yellow'} /> */}
            <Icon name={favouriteBook ? 'heart' : 'heart-o'} onPress={AddToFavourites} color={favouriteBook ? '#F44336' : 'rgb(50,50,50)'}
              size={30} />
            <Text style={styles.font}>
              {favouriteBook ? 'Remove from favourites' : 'Add to favourites'}
            </Text>
          </View>

        </Card>
      </TouchableOpacity>

      <View style={{ flex: 1 }}>

        <DeleteBookModal
          isVisible={isDeleteVisible}
          ToggleModal={ToggleModal}
          DeleteBook={DeleteBook}
          BookID={BookID}
          LoadBooks={LoadBooks}
        />
      </View>

      <Animated.View style={{ opacity: isAnimationVisible, justifyContent: 'center', width: '70%', alignSelf: 'center' }}>
        <Text style={[styles.font, styles.center, styles.white, styles.deletePopup]}>Your book has been deleted!</Text>
      </Animated.View>

      <View style={{ flex: 1 }}>
        <SingleBookModal
          isVisible={isEditVisible}
          toggleModal={ToggleEditModal}
          Description={Description}
          Pagination={Pagination}
          Title={Title}
          updateBook={updateBook}
          Publisher={Publisher}
          BookID={BookID}
          IShort={ISBNShort}
          ILong={ISBNLong}
          Image={Image}
          Author={Author}
          loadBooks={LoadBooks}
        />

      </View>


    </View>
  )
}



export default withNavigation(CustomUserBooksCard);
