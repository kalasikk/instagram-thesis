import React, {useState, useEffect} from 'react';
import classes from './Account.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function Account() {

    const [images,
        setImages] = useState([]);

    const [fbUserData, setFbUserData] = useState({isLoggedIn: false})

    useEffect(() => {
        try {
            const getInstagramMedia = async () => {
                const fields = 'id,media_type,media_url,username,timestamp,caption,thumbnail_url'
                const response = await fetch(`https://graph.instagram.com/me/media?fields=${fields}&access_token=IGQVJXR2F1OE1KMXhRSWMxZAFk1Y2FqU1NBYTlCeEpUWGJLM3ZAhb2tfbVFpTkNkVGlGOUZAraUFOQWpKb0QxNlQ2MFpRWmREY2g4RnlMNWo1eWdNcGNjaDdBUTVoZAHRCS1lmb0ZAqXzE1enFoekVlNjQ0TgZDZD`)
                const oMediaData = await response.json();
                setImages(oMediaData.data)

            }
        //    getInstagramMedia();
        } catch (error) {
            console.error(error)
        }

    }, [])

    const onFacebookLogInClick = () => {
        window.FB.login(function(response) {
            console.log(response);
            if(response.status === "connected"){
                setFbUserData(prevState => ({
                    ...prevState,
                    accessToken: response.authResponse.accessToken,
                    userID: response.authResponse.userID,
                    isLoggedIn: true,
                }))
            }
          }, {
              scope: 'instagram_manage_insights,instagram_manage_comments,instagram_content_publish,instagram_basic,pages_show_list,user_birthday,user_location,user_photos,user_posts,user_link,public_profile,user_birthday,user_hometown,user_likes,user_videos,user_friends,user_status,user_tagged_places,user_gender,user_age_range,email,business_management'});
    }

    useEffect(() => {
        const getInstagramProfileData = async () => {
            const fields = 'media'
            const response = await fetch(`https://graph.facebook.com/v3.2/${fbUserData.userID}?access_token=${fbUserData.accessToken}`)
            // const response = await fetch(`https://api.instagram.com/v1/users/self?access_token=${fbUserData.accessToken}`,{
            // headers:{
            //     'Access-Control-Allow-Origin': 'https://api.instagram.com'
            // }
            // })
            const oUserData = await response.json();
            // setImages(oMediaData.data)
            console.log(oUserData)
        }
        if(fbUserData.isLoggedIn){
            getInstagramProfileData()
        }
    }, [fbUserData])



    return (
        <main className={classes.content}>
            <div className={classes.appBarSpacer}/>
            <Container className={classes.container}>
                {!!images?.length && images.map(image =>
                <Row style={{height: '400px'}}>
                    <Col>{Date(image.timestamp)}</Col>
                    <Col>
                    <img src={image.media_url} style={{height: '100%', width: '100%'}} alt="No data"></img>
                    </Col>
                </Row>)}
                <Row>
                    <Col>
                    {/* <div className="fb-login-button" data-width="" data-size="large" data-button-type="continue_with" data-layout="rounded" data-auto-logout-link="false" data-use-continue-as="true"></div> */}
                    {!fbUserData.isLoggedIn && <button onClick={onFacebookLogInClick}>Log in to facebook</button>}
                    </Col>
                </Row>
                {/* <Row className={classes.welcomeRow}>
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
                </Row> */}
            </Container>
        </main>
    );
}