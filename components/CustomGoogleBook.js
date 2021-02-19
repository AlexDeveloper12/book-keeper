import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from '../styles/global';
import { Card } from 'react-native-elements';
import GoogleBookAddButton from './GoogleBookAddButton';


function CustomGoogleBook({ title, description, authors, pageCount, imageLinks, identifierType, identifierValue }) {
    let trimDescription = description !== undefined ? description : 'No description available';

    return (
        <View>
            <Card>
                <Card.Title>
                    <Text style={styles.font}>{title}</Text>
                </Card.Title>
                {authors !== undefined ? <Text style={styles.font}>Author(s): {authors[0]}</Text> : <Text style={styles.font}>No author information available</Text>}
                {pageCount !== undefined ? <Text style={styles.font}>Page count: {pageCount}</Text> : <Text style={styles.font}>No page count available</Text>}
                {description !== undefined ? <Text style={styles.font}>Description: {trimDescription}</Text> : <Text style={styles.font}>No description available</Text>}
                {imageLinks !== undefined ? <Image source={{ uri: 'https:' + imageLinks.thumbnail.substr(4) }} width={100} height={100} /> : null}
                {identifierValue !== undefined ? <Text>ISBN Short: {identifierValue}</Text> : null}

                <GoogleBookAddButton
                    title={title}
                    description={description}
                    author={authors}
                    pagination={pageCount}
                    isbnLong={identifierValue}
                    image={imageLinks}
                />


            </Card>
        </View>
    )

}


export default CustomGoogleBook;