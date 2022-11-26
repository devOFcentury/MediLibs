import { 
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar, 
} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import SwipeContainer from '../../components/SwipeContainer'
import './Acceuil.css';

const URL_MOVIES = 'https://api.themoviedb.org/3/movie/popular?api_key=707b3d8f99f24b6c0a6fe07060abaf4d&language=fr-FR';
const URL_TV = 'https://api.themoviedb.org/3/tv/popular?api_key=707b3d8f99f24b6c0a6fe07060abaf4d&language=fr-FR';
const URL_Trending = 'https://api.themoviedb.org/3/trending/all/day?api_key=707b3d8f99f24b6c0a6fe07060abaf4d&language=fr-FR';

const Acceuil: React.FC = () => {
  
  const [movies, setMovies] = useState([] as any);
  const [tv, setTv] = useState([] as any);
  const [trending, setTrending] = useState([] as any);

  useEffect(() => {
    fetch(URL_MOVIES)
    .then(res => res.json())
    .then(res => setMovies(res.results));

    fetch(URL_TV)
    .then(res => res.json())
    .then(res => setTv(res.results));

    fetch(URL_Trending)
    .then(res => res.json())
    .then(res => setTrending(res.results));
 
}, [])

  return (
    <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle slot="start" color='warning'>MediaLibs</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
        <div className="Acceuil">
              
              <img src='../../assets/Woman-king.jpg' alt='woman' />
              <p className='box-title'>Top film</p>
              <SwipeContainer results={movies}  />
              <p className='box-title'>TV</p>
              <SwipeContainer results={tv} />
              <p className='box-title'>Tendances</p>
              <SwipeContainer results={trending} />
         </div>
        </IonContent>

      <IonFooter>
        <IonToolbar>
          <IonButtons slot="start">
              <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  )
}

export default Acceuil