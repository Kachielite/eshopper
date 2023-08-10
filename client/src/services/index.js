import axios from 'axios';

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_ENDPOINT}/v1`,
    withCredentials: true // Automatically send cookies with requests
});

// Set Content-Type as a default header
instance.defaults.headers['Content-Type'] = 'application/json';

export default instance;