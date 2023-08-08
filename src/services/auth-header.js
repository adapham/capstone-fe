export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) {
        console.log('if && '+ user && user.accessToken)
        return { Authorization: 'Bearer ' + user.accessToken };
    } else {
        console.log('Authorization Error');
        return {};
    }
}