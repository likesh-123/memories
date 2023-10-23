import axios from 'axios';

const url = `${process.env.SERVER}/memories-api/user/posts`;

export const fetchPosts = () => axios.get(url);
