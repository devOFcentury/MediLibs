import { 
  IonButtons, 
  IonContent, 
  IonFooter, 
  IonHeader, 
  IonLoading, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import Info from '../../components/Info';
import MoviesBox from '../../components/MovieBox';
import './TV.css';


interface genreProps extends RouteComponentProps<{
  id: string,
  genre: string
}>{}

const API_MOVIES_BY_GENRES = 'https://api.themoviedb.org/3/discover/tv?api_key=707b3d8f99f24b6c0a6fe07060abaf4d&language=fr-FR&with_genres=';
const URL_TV = 'https://api.themoviedb.org/3/tv/popular?api_key=707b3d8f99f24b6c0a6fe07060abaf4d&language=fr-FR';

const TV: React.FC<genreProps> = ({match}) => {

  const [genre, setGenre] = useState('');
  const [tvMovies, setTvMovies] = useState([] as any);
  const [showLoading, setShowLoading] = useState(false);
  const [simpleUrl, setSimpleUrl] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({} as any);


  useEffect(() => {
    setSimpleUrl(false);
    if(!!match.params.genre && !!match.params.id) {
      setShowLoading(true)
      fetch(API_MOVIES_BY_GENRES + match.params.id)
      .then(res => res.json())
      .then(res => {
        setGenre(match.params.genre);
        setTvMovies(res.results);
        setShowLoading(false)
      })
    }
    else {
      setShowLoading(true)
      fetch(URL_TV)
      .then(res => res.json())
      .then(res => {
        setTvMovies(res.results);
        setShowLoading(false);
        setSimpleUrl(true)
      })
    }
    setShowLoading(false)
  }, [match.params.genre, match.params.id]);

 

  return showLoading ?  (
    <IonLoading
      isOpen={showLoading}
      onDidDismiss={() => setShowLoading(false)}
      message={'Veuillez patienter'}
      spinner='circles'
    />
  ): (
    <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle slot="start" color='warning'>MediaLibs</IonTitle>
            <IonTitle slot="end" color='warning'>{genre !== '' ? genre : 'Tv' }</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <MoviesBox moviesprops={tvMovies} tv_movies='tv' simpleUrl={simpleUrl} setOpen={setOpen} setData={setData} />
          <Info open={open} setOpen={setOpen} data={data} />
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

export default TV