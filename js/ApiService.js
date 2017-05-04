let apiService = axios.create({
    baseURL: 'http://i4m.herokuapp.com/',
    timeout: 10000,
});

export default apiService;