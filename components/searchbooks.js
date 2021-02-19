import React, { useState } from 'react';
import {
  View, TextInput, FlatList,
} from 'react-native';
import axios from 'axios';
import { bookkey } from '../API/keys';
import calls from '../API/calls';
import CustomGoogleBook from './CustomGoogleBook';
import Loader from './Loader';
import SearchBookTextInput from './SearchBookTextInput';

function SearchBook({ navigation }) {
  const [animating, setAnimating] = useState(false);
  const [query, setQuery] = useState('');
  const [searchBook, setSearchBook] = useState([]);
  const [startIndex, setStartIndex] = useState(10);

  const SearchGoogleBooks = async (myQuery) => {
    setAnimating(true);
    setQuery(myQuery);

    if (query.length > 0) {
      axios({
        method: 'GET',
        url: `${calls.googlebooks}${myQuery}&key=${bookkey}&filter=full&maxResults=10&startIndex=${startIndex}`,
      })
        .then((response) => {

          if (response !== null && response !== undefined && response !== "") {
            setAnimating(false);
            setSearchBook(startIndex === 10 ? response.data.items : [...searchBook, ...response.data.items]);

          }
        })
        .catch((error) => {
          console.log(`Error google books: ${error}`);
        });
    }
  };

  const renderGoogleBook = ({ item, index }) => {


    return (
      <CustomGoogleBook
        title={item.volumeInfo.title}
        authors={item.volumeInfo.authors}
        pageCount={item.volumeInfo.pageCount}
        description={item.volumeInfo.description}
        imageLinks={item.volumeInfo.imageLinks}
      />
    );
  };

  const renderFooter = () => (
    animating
      ? (
        <View>
          <Loader />
        </View>
      ) : null
  );

  const LoadMoreResults = () => {
    setStartIndex(startIndex + 10);
    SearchGoogleBooks(query);
    console.log('load more results');
  };

  const keyExtractor = (item) => item.id;

  return (
    <View style={{ height: '100%', backgroundColor: '#2F3C51' }}>
      <View style={{ marginTop: '10%' }}>

        <SearchBookTextInput
          placeholder={"Search..."}
          placeholderColor={"#f5f6fa"}
          SearchGoogleBooks={SearchGoogleBooks}
        />


        {query.length > 0

          ? (
            <FlatList
              keyboardShouldPersistTaps='always'
              data={searchBook}
              renderItem={renderGoogleBook}
              refreshing
              keyExtractor={keyExtractor}
              onEndReached={LoadMoreResults}
              onEndReachedThreshold={0.5}
              ListFooterComponent={renderFooter}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          ) : <Loader animating={animating} />}

      </View>
    </View>
  );
}

export default SearchBook;
