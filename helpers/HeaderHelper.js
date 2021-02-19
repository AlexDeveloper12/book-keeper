export default function HeaderInfo(token) {

    const headerInfo = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }

    if (token !== null && token !== undefined && token !== "") {
        return headerInfo;
    }

    return {}

}