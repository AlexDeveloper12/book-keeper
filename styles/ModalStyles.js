import { StyleSheet,Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ModalStyles = StyleSheet.create({


    singleBookModalHeight:{
        maxHeight:hp('78%')
    },
    deleteBookModalHeight:{
        maxHeight:hp('30%')
    },

    modalContainer:{
        backgroundColor: 'white', alignContent: 'center', justifyContent: 'center', marginTop: hp('10%')
    },

    bottomOptionsPadding: {
        padding: 10
    },
    viewContainer:{
        height: '35%', alignSelf: 'center', flexDirection: 'row' 
    },
    container: {
        backgroundColor: 'white', maxHeight: '30%',alignItems:'center'

    },
    innerContainer:{
        flex: 1, justifyContent: 'center'
    },
    ok:{
        backgroundColor: '#2ecc71', width: '50%',alignSelf:'flex-end'
    },
    cancel:{
        backgroundColor: 'red', width: '50%',alignSelf:'flex-end' 
    }

});

export default ModalStyles;