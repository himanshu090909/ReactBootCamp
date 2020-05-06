import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-b435e.firebaseio.com/' 
});

export default instance;