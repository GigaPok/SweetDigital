import { CardMedia, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Card from '../components/Card'
import Loader from '../components/Loader';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


const SinglePage = () => {

    const [data, setData] = useState([])
    const [user, setUser] = useState()
    const [Loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [title, setTitle] = useState([])

    useEffect(() => {

        fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/1/friends/${page}/20`)
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

    let { id } = useParams();

    useEffect(() => {

        fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`)
            .then(data => data.json())
            .then(result => setUser(result))
    }, [page, id])

    return (
        <>
            {user && <Grid container spacing={3}>
                <Grid item xs>
                    <CardMedia
                        component="img"
                        height="240"
                        image={user.imageUrl}
                        alt={user.title}
                    />
                </Grid>
                <Grid item xs={6}>
                    Info:
                    <Box>
                        <h2>{user.prefix}{user.name}</h2>
                        {user.title}
                    </Box>
                    <Box>
                        <p>Email: {user.email}</p>
                        <p>Ip Address: {user.ip}</p>
                        <p>Job Area: {user.jobArea}</p>
                        <p>Job Type: {user.jobType}</p>
                    </Box>
                </Grid>
                <Grid item xs>
                    Address:
                    <Box>
                        <h2>{user.address.streetAddress}</h2>
                    </Box>
                    <Box>
                        <p>City: {user.address.city}</p>
                        <p>Country: {user.address.country}</p>
                        <p>State: {user.address.state}</p>
                        <p>Street Address: {user.address.streetAddress}</p>
                        <p>zipCode: {user.address.zipCode}</p>
                    </Box>
                </Grid>
            </Grid>
            }
            {
                title && title.map((el, index) => (
                    <>
                        <Link to={el.link}>{el.name}</Link> {title.length > (index + 1) && ' > '}
                    </>
                ))
            }

            <h2>Friends:</h2>
            <>
                {data && <Grid container spacing={2}>
                    {
                        data.map(el => (
                            <Grid item lg={3} key={el.id} xs={6} md={4}>
                                <Link to={`/user/${el.id}`} onClick={() => setTitle([...title, { name: el.name, link: `/user/${el.id}` }])}>
                                    <Card name={el.name} img={`${el.imageUrl}?id=${el.id}`} prefix={el.prefix} title={el.title} />
                                </Link>
                            </Grid>
                        ))
                    }
                    {Loading && <Loader />}
                </Grid>
                }

            </>
        </>
    );
};

export default SinglePage;