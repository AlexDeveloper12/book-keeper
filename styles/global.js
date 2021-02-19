import {StyleSheet} from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#2F3C51',
        height:heightPercentageToDP('100%'),
        width:widthPercentageToDP('100%'),
        fontSize:widthPercentageToDP('3.75%')
    },
    white:{
        color:'white'
    },
    font:{
        fontFamily:'Montserrat-Light'
    },
    fontbold:{
        fontFamily:'Montserrat-Bold'
    },

    textPadding:{
        paddingLeft:'2%'
    },

    center:{
        textAlign:'center'
    },
    textinput:{
        flex: 1,
        opacity:0.8,
        color:'white',
        marginLeft:'2%',
        marginRight:'2%',
        fontFamily:'Montserrat-Light'
    },
    inputContainer:{
        flexDirection: 'row', 
        borderBottomWidth: 1, 
        borderColor: 'grey', 
        paddingBottom: 6,
        marginBottom:'10%'
    },
    bottomButton:{
        justifyContent: 'center', width: '70%', alignSelf: 'center'
    },
    bottomButtonPadding:{
        padding:12
    },
    bottomButtonFontSize:{
        fontSize:20
    },   
    icon:{
        marginLeft:'2%',
        marginRight:'3%'
    },
    opacity:{
        opacity:0.6
    },

    innerContainer:{
        alignItems:'center',
        justifyContent:'center',
        marginTop:'10%'
    },
    bookText:{
        fontFamily:'Montserrat-Light',
        fontSize:50,
    },
    buttonBGColour:{
        backgroundColor:'#4F6C6B'
    },
    searchTextInput:{
        fontFamily: 'Montserrat-Light', 
        borderBottomWidth: 1, 
        borderColor: 'white', 
        color: 'white', 
        fontSize: 20,
    },
    deletePopup:{
        backgroundColor:'#3fc380',
        padding:10
    },
    wrap:{
        flexShrink:1
    },
    iconMargin:{
        marginLeft:'1%'
    },
    leftChevronContainer:{
        flexDirection: 'row', justifyContent: 'flex-start',marginTop:'20%',marginLeft:'1%' 
    },
    singleBookBorder:{
        borderBottomColor:'black',
        borderBottomWidth:0.4
    },
    fullWidth:{
        width:'98%'
    }

    
});

export default styles;