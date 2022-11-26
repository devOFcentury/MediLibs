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
import MoviesBox from '../../components/MovieBox';
import './Movies.css'


interface genreProps extends RouteComponentProps<{
  id: string,
  genre: string
}>{}

// const API_MOVIES_BY_GENRES = 'https://api.themoviedb.org/3/discover/tv?api_key=707b3d8f99f24b6c0a6fe07060abaf4d&language=fr-FR&with_genres=';
const API_MOVIES_BY_GENRES = 'https://api.themoviedb.org/3/discover/movie?api_key=707b3d8f99f24b6c0a6fe07060abaf4d&language=fr-FR&with_genres=';
// const URL_TV = 'https://api.themoviedb.org/3/tv/popular?api_key=707b3d8f99f24b6c0a6fe07060abaf4d&language=fr-FR';
const URL_MOVIES = 'https://api.themoviedb.org/3/movie/popular?api_key=707b3d8f99f24b6c0a6fe07060abaf4d&language=fr-FR';


const Movies: React.FC<genreProps> = ({match}) => {

  const [genre, setGenre] = useState('');
  const [movies, setMovies] = useState([] as any);
  const [showLoading, setShowLoading] = useState(false);
  const [simpleUrl, setSimpleUrl] = useState(false);


  useEffect(() => {
    setSimpleUrl(false);
    if(!!match.params.genre && !!match.params.id) {
      setShowLoading(true)
      fetch(API_MOVIES_BY_GENRES + match.params.id)
      .then(res => res.json())
      .then(res => {
        setGenre(match.params.genre);
        setMovies(res.results);
        console.log(res)
        setShowLoading(false)
      })
    }
    else {
      setShowLoading(true)
      fetch(URL_MOVIES)
      .then(res => res.json())
      .then(res => {
        setMovies(res.results);
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
            <IonTitle slot="end" color='warning'>{genre !== '' ? genre : 'Films' }</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <MoviesBox moviesprops={movies} tv_movies='movie' simpleUrl={simpleUrl} />
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


  // return (
  //   <IonPage>
  //       <IonHeader>
  //         <IonToolbar>
  //           <IonTitle slot="start" color='warning'>MediaLibs</IonTitle>
  //         </IonToolbar>
  //       </IonHeader>

  //       <IonContent>Movies</IonContent>

  //     <IonFooter>
  //       <IonToolbar>
  //         <IonButtons slot="start">
  //             <IonMenuButton />
  //         </IonButtons>
  //       </IonToolbar>
  //     </IonFooter>
  //   </IonPage>
  // )
}

export default Movies