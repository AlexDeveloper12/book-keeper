import React, { useEffect, useState } from 'react';
import axios from 'axios';


export async function GetData(url, method, headers, navigation ) {

    console.log('before res');
    

    const res = await axios({
        method: method,
        url: url,
        headers: headers
    });
    
    console.log(res);

    if (res.status === 200) {
        return res.data.message[0];
    } else if (res.status === 401) {
        navigation.navigate('Auth');
    }

};

export async function PostData(url, method, headers, navigation, body) {
    const res = await axios({
        method: method,
        url: url,
        headers: headers,
        data:body
    });

    if (res.status === 200) {
        return res.data;
    } else {
        return false;
    }
};
