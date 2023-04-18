import React, { useEffect, useState } from 'react'
import styles from "../movies/movie.module.scss"
import axios from "axios";
import Header from '../header';
import { useNavigate } from "react-router-dom"
import Loader from "../../images/loader.gif"
function Movie() {
    const navigate = useNavigate();
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [searchUpcomingMovies, setSearchUpComingMovies] = useState([]);
    useEffect(()=>{
        dovalidate()
        doCallAnApi()
    },[])
    const dovalidate = () => {
        if (!sessionStorage.getItem("emailId") || !sessionStorage.getItem("name")) {
            navigate('/')
        }
    }
    const doCallAnApi = async () => {
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
        let resp = await axios.request(options)
        console.log(resp,"resp")
        setUpcomingMovies(resp.data.titles);
        setSearchUpComingMovies(resp.data.titles)
    }

    console.log(upcomingMovies, "upcomingMovies")
    const doSearch = (e) => {
        let SearchText = e.target.value.toLowerCase();
        let searchedValue = searchUpcomingMovies.filter((values) => {
            return values.jawSummary.title.toLowerCase().includes(SearchText)
        })
        setUpcomingMovies(searchedValue)
    }
    return (
        <div>
            <Header />
            <input placeholder="search..." className={styles.searchArea} onChange={doSearch} />
            {upcomingMovies?.length > 0 ? <div className={styles.row}>
                {upcomingMovies?.map((data , index) => {
                    return (
                        <div className={styles.column} key={index} >
                            <img src={data.jawSummary.backgroundImage.url} alt="img"  />
                            <h1>{data.jawSummary.title}</h1>

                        </div>
                    )
                })}
            </div>
                : <div className={styles.loader}>
                    <img alt='loader' src={Loader} />
                </div>
            }
        </div >
    )
}

export default Movie