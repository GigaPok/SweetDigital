import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card'
import Loader from '../components/Loader';


const MainPage = () => {

    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [Loading, setLoading] = useState(false)

    useEffect(() => {


        fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/20`)
            .then(data => data.json())
            .then(result => setData([...data, ...result.list]))
            .finally(() => setLoading(false))
    }, [page])

    window.onscroll = function () {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            setPage(page + 1)
            setLoading(true)
        }
    }

    return (
        <>
            {data && <Grid container spacing={2}>
                {
                    data.map(el => (
                        <Grid item lg={3} key={el.id} xs={6} md={4}>
                            <Link to={`/user/${el.id}`}>
                                <Card name={el.name} img={`${el.imageUrl}?id=${el.id}`} prefix={el.prefix} title={el.title} />
                            </Link>
                        </Grid>
                    ))
                }
                {Loading && <Loader />}
            </Grid>}

        </>
    );
};

export default MainPage;