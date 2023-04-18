import axios from "axios";


export const users = [
    { name: 'Seshan', email: "admin@gmail.com", Password: "admin123", role: 1, gender: "male" },
    { name: 'Harish', email: "manager@gmail.com", Password: "manager123", role: 2, gender: "male" },
    { name: 'Selva', email: "customer@gmail.com", Password: "customer123", role: 3, gender: "male" },

]

export const getMovies = async () => {
    const options = {
        method: 'GET',
        url: 'https://netflix54.p.rapidapi.com/search/',
        params: {
            query: 'stranger',
            offset: '0',
            limit_titles: '50',
            limit_suggestions: '20',
            lang: 'en'
        },
        headers: {
            'X-RapidAPI-Key': 'b062feeb8fmsh10996b9ca49667cp137157jsn02858e58209e',
            'X-RapidAPI-Host': 'netflix54.p.rapidapi.com'
        }
    };
    const resp = await axios.request(options);
    const movies = resp.data.titles
    return movies
}


