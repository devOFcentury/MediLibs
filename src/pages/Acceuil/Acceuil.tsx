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
import { 
  URL_MOVIES, 
  URL_TV,
  URL_Trending,
  URL_BOOK
} from "../../API.js";
import SwipeContainer from '../../components/SwipeContainer';
import Info from '../../components/Info';
import './Acceuil.css';



const Acceuil: React.FC = () => {
  
  const [movies, setMovies] = useState([] as any);
  const [tv, setTv] = useState([] as any);
  const [trending, setTrending] = useState([] as any);
  const [books, setBooks] = useState([] as any)
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({} as any);


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

    fetch(URL_BOOK)
    .then(res => res.json())
    .then(res => setBooks(res));
 
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
              <SwipeContainer results={movies} setData={setData} setOpen={setOpen} type='movie_Tv' />
              <p className='box-title'>TV</p>
              <SwipeContainer results={tv} setData={setData} setOpen={setOpen} type='movie_Tv' />
              <p className='box-title'>Tendances</p>
              <SwipeContainer results={trending} setData={setData} setOpen={setOpen} type='movie_Tv' />
              <p className='box-title'>Livres</p>
              <SwipeContainer results={books} setData={setData} setOpen={setOpen} type='book' />
              <Info open={open} setOpen={setOpen} data={data} />
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