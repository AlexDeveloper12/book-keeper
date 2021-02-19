
import * as Keychain from 'react-native-keychain';

export const CheckToken = async () => {

    let objectData = {}

    await Keychain.getGenericPassword().then(credentials => {
        const { password } = credentials;


        if (password !== null && password !== undefined && password !== "") {

            const parseTokenData = JSON.parse(password);

            const token = parseTokenData["token"];
            const refreshToken = parseTokenData["refreshToken"];

            console.log('password in CheckToken');

            console.log(password);

            if (token !== null && token !== undefined && token !== "" && refreshToken !== null && refreshToken !== undefined && refreshToken !== "") {

                objectData = {
                    status: true,
                    token: token,
                    refreshToken: refreshToken
                };
            }

        } else {
            objectData = {
                status: false,
                token: null,
                refreshToken: null
            }
        }
    });


    return objectData;


}