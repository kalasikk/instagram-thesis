import React, {useState, useEffect} from 'react';
import classes from './Main.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function Main() {

    const [todos,
        setTodos] = useState(null);

    useEffect(() => {
        try {
            fetch('http://localhost:8000/api/todo/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                    }
                })
                .then(response => response.json())
                .then(json => {
                    setTodos(json)
                })
        } catch (error) {
            console.error(error)
        }

    }, [])

    const onGetInstagramProfileClick = async () => {
        try {
            const fields = 'id,media_type,media_url,username,timestamp'
            const mediaId = '17875470742825365';
            // const response = await fetch(`https://graph.instagram.com/me/media?access_token=IGQVJXR2F1OE1KMXhRSWMxZAFk1Y2FqU1NBYTlCeEpUWGJLM3ZAhb2tfbVFpTkNkVGlGOUZAraUFOQWpKb0QxNlQ2MFpRWmREY2g4RnlMNWo1eWdNcGNjaDdBUTVoZAHRCS1lmb0ZAqXzE1enFoekVlNjQ0TgZDZD`)
            const response = await fetch(`https://graph.facebook.com/v3.2/1363727464026144?access_token=EAA1tRUWf8kABAP3xjXHQArXWFHZCeT9OXef3wb21qWDFNFwVPQgSVb42buPmTEvb3bxOYaVWb8PeuyC08PLqJWYacVVaZCDEncO8x3GatcZBKieT09xIkPZBrAjLdAjZAmO7WdsJwSfmo1iMDIegeJJKFTQoNK0GbSO1LB0HwhqcfBHhk5caWHNUzITQoFsZAy8T10911hswZDZD`)
            // const response = await fetch(`https://api.instagram.com/v1/users/self/follows?access_token=IGQVJXR2F1OE1KMXhRSWMxZAFk1Y2FqU1NBYTlCeEpUWGJLM3ZAhb2tfbVFpTkNkVGlGOUZAraUFOQWpKb0QxNlQ2MFpRWmREY2g4RnlMNWo1eWdNcGNjaDdBUTVoZAHRCS1lmb0ZAqXzE1enFoekVlNjQ0TgZDZD`)
            const oInstagramProfile = response.json();
        } catch (error) {
            console.error(error)
        }

    }

    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer}/>
            <Container className={classes.container}>
                {todos?.length && todos.map(todo => <Row>
                    <Col>{todo.title}</Col>
                    <Col>{todo.description}</Col>
                </Row>)}
                <Row className={classes.welcomeRow}>
                    <Col>
                    <button onClick={onGetInstagramProfileClick}> Get Instagram Profile </button>
                    </Col>
                    <Col>Short App description</Col>
                </Row>
                <br/>
                <Row className={classes.creatorRow}>
                    <Col>Short Creator user description</Col>
                    <Col>Image</Col>
                </Row>
                <br/>
                <Row className={classes.businessRow}>
                    <Col>Image</Col>
                    <Col>Short Business user description</Col>
                </Row>
            </Container>
        </main>
    );
}