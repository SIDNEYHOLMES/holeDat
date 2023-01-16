import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import CommentForm from './CommentForm';
import PotholeRating from '../addPothole/formQuestions/PotholeRating';
import Switch from 'react-bootstrap/Switch';
import Slider from './Slider';
// import PotholeStatus from '../addPothole/formQuestions/PotholeStatus';

const Pothole = () => {
  const id = Number(useLocation().pathname.split(':')[1]);

  interface User {
    name: string;
    photo: string;
    userId_user: number | undefined;
    badge_id: number | undefined;
  }

  type phImg = {
    image_id: number;
    photoURL: string;
    caption: string;
    userId: number;
    userName: string;
    userPhoto: string;
    lat: number;
    lon: number;
    fixed: boolean;
    badge_id: number;
  };

  type badgeObj = {
    badge_id: number;
    imgUrl: string;
    description: string;
    name: string;
  };

  const [badge, setBadge] = useState<badgeObj[]>([]);
  const [PImages, setPImages] = useState<phImg[]>([]);
  const [addy, setAddy] = useState<string[]>([]);
  const [phId] = useState<number>(id);
  const [user, setUser] = useState<User>({
    name: '',
    photo: '',
    userId_user: undefined,
    badge_id: undefined,
  });
  const [avg, setAvg] = useState<number>(0);
  const [fixed, setFixed] = useState<boolean>(false);
  // const [voteCount, setVotecount] = useState<number>(0);

  const getAllRatingByPhId = () => {
    axios.get('/api/rating/rating' + id).then((data) => {
      const Avg =
        data.data.reduce((acc, curr) => {
          acc += curr;
          return acc;
        }, 0) / data.data.length;
      setAvg(Math.round(Avg));
      // setVotecount(data.data.length);
    });
  };

  // const getBadge = (id) => {
  //   console.log(id);
  //   setBadge(id);
  // }

  // get pothole images by potholeID
  const getAllPotholeImgByPhId = () => {
    axios
      .get('/api/imgs/potholeimgs' + id)
      .then((data) => {
        const resObj: [] = data.data.map((each) => {
          const { image_id, caption, photoURL } = each;
          const { user_id, name, photo, badge_id } = each.User;
          const { lat, lon, fixed } = each.Pothole;
          return {
            image_id,
            caption,
            photoURL,
            userId: user_id,
            userName: name,
            userPhoto: photo,
            badge_id,
            lon,
            lat,
            fixed,
          };
        });
        setPImages(resObj);
        //getBadge(data);
        return data.data[0].Pothole;
      })
      .then((data) => {
        const { lat, lon } = data;
        axios('/api/location/getAddy', { params: { lat, lon } }).then((data) =>
          setAddy(data.data.split(',')[0])
        );
      })
      .catch((err) => console.log(err));
  };

  const getUser = () => {
    axios.get('/api/user/me').then((data) => {
      setUser({
        name: data.data.name,
        photo: data.data.photo,
        userId_user: data.data.user_id,
        badge_id: data.data.badge_id,
      });
    });
  };

  const getAllBadges = () => {
    axios
      .get('/api/badges/allBadges')
      .then(({ data }) => setBadge(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllBadges();
    getUser();
    getAllPotholeImgByPhId();
    getAllRatingByPhId();
  }, []);

  return (
    <div id='potholeProfile'>
      <Container id='potholeSect' className='post'>
        <Container className='post_header'>
          <div id='address'>
            <h3>{addy}</h3>
            <div id='score'>
              {avg}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='25'
                fill='currentColor'
                className={`bi bi-cone-striped${'clickCone'}`}
                viewBox='0 0 16 16'
              >
                <path d='m9.97 4.88.953 3.811C10.159 8.878 9.14 9 8 9c-1.14 0-2.158-.122-2.923-.309L6.03 4.88C6.635 4.957 7.3 5 8 5s1.365-.043 1.97-.12zm-.245-.978L8.97.88C8.718-.13 7.282-.13 7.03.88L6.275 3.9C6.8 3.965 7.382 4 8 4c.618 0 1.2-.036 1.725-.098zm4.396 8.613a.5.5 0 0 1 .037.96l-6 2a.5.5 0 0 1-.316 0l-6-2a.5.5 0 0 1 .037-.96l2.391-.598.565-2.257c.862.212 1.964.339 3.165.339s2.303-.127 3.165-.339l.565 2.257 2.391.598z' />
              </svg>
            </div>
          </div>

          <div id='rating_status'>
            <PotholeRating />
          </div>

          <div className='fixed'>
            <Switch checked={fixed} onChange={() => setFixed(!fixed)} />
            <p className='xsmall'>Not Fixed</p>
          </div>
        </Container>
        <Slider badge={badge} PImages={PImages} user={user} />
      </Container>
      <Container className='comment-container'>
        <CommentForm phId={phId} />
      </Container>
    </div>
  );
};

export default Pothole;
