import { 
  IonCard, 
  IonIcon, 
  IonImg, 
  IonSearchbar 
} from '@ionic/react';
import React, { useState } from 'react';
import './MovieBox.css';


const API_IMG = "https://image.tmdb.org/t/p/w500/";
const API_SEARCH = "https://api.themoviedb.org/3/search/movie?api_key=707b3d8f99f24b6c0a6fe07060abaf4d&query=";

interface MoviesProps {
    moviesprops: any,
    tv_movies: 'tv' | 'movie'
    simpleUrl: boolean
}

const MoviesBox: React.FC<MoviesProps> = ({ moviesprops, tv_movies, simpleUrl }) => {

  const [search, setSearch] = useState('');
  const [saveData, setSaveData] = useState([] as any);
  const [iskeyEnter, setIskeyEnter] = useState(false);

  // useEffect(() => {
  //   console.log('MovieBox')
  //   async function fetchData(tv_movies: 'tv' | 'movie') {
  //     const searchResponse = await fetch(`https://api.themoviedb.org/3/search/${tv_movies}?api_key=707b3d8f99f24b6c0a6fe07060abaf4d&query=${search}`);
  //     const searchJson = await searchResponse.json();
  //     setSaveData(searchJson.results);
  //   }

  //   if(search !== '') fetchData(tv_movies);
  // }, [search]);


  const handleKeypress = async (e: any) => {
    if(e.key === 'Enter' && search !== '') {
      const searchResponse = await fetch(`https://api.themoviedb.org/3/search/${tv_movies}?api_key=707b3d8f99f24b6c0a6fe07060abaf4d&query=${search}`);
      const searchJson = await searchResponse.json();
      setSaveData(searchJson.results);
      setIskeyEnter(true)
    }
  }

  

  function showMoviesOrTv(data: [], nothing?: boolean) {
    return (
      <div className='container'>
        {
          simpleUrl && 
          <IonSearchbar 
            placeholder='Recherher un film' 
            value={search} 
            onKeyPress={handleKeypress} 
            onIonChange={e => {
              setSearch(e.detail.value!);
              if(e.detail.value! === '') {
                setIskeyEnter(false)
              }
              // setIskeyEnter(false);
            }}
          />
        }

        {
          nothing ? (
            <div className="empty">
              <p>Pas d'éléments correspondant à votre recherche</p>
            </div>
          ) : (
            <div className="grid">
          {
            data.map((item: any, index: any) => (
              <IonCard key={index}>
                <IonImg src={item.poster_path ? (API_IMG+item.poster_path) : '../../assets/default-image.jpg'} alt='image du film' />
              </IonCard>
            ))
          }
        </div>
          )
        }
        
      </div>
    )
  }


  if (saveData.length > 0 && iskeyEnter) {
    return showMoviesOrTv(saveData);
  }
  else if (saveData.length === 0 && iskeyEnter) {
    return showMoviesOrTv([], true);
  }
  else if (moviesprops.length > 0 && !iskeyEnter) {
    return showMoviesOrTv(moviesprops);
  }
  else if (moviesprops.length === 0 && !iskeyEnter) {
    return(
      <div className="empty">
        <p> il n'y a pas d'éléments de cette catégorie</p>
        <p>Nous en rajouterons Merci</p>
      </div>
    ) 
  }
  else {
    return null;
  }

  // if(saveData.length > 0 && search.length > 0) {
  //    return showMoviesOrTv(saveData);
  // }
  // else if(moviesprops.length > 0 && search.length === 0) {
  //    return showMoviesOrTv(moviesprops);
  // }
  // else if(moviesprops.length === 0) {
  //   return(
  //     <div className="empty">
  //       <p> il n'y a pas d'éléments de cette catégorie</p>
  //       <p>Nous en rajouterons Merci</p>
  //   </div>
  //   )
  // }
  // else {
  //   return showMoviesOrTv([], true);
  // }


  // return moviesprops.length > 0 ? (
  //   <div className='container'>
  //     {
  //       simpleUrl && 
  //       <IonSearchbar placeholder='Recherher un film' value={search} onIonChange={e => setSearch(e.detail.value!)} />
  //     }
  //   <div className="grid">
  //     {
  //       moviesprops.map((item: any, index: any) => (
  //         <IonCard key={index}>
  //           <IonImg src={item.poster_path ? (API_IMG+item.poster_path) : '../../assets/default-image.jpg'} alt='image du film' />
  //         </IonCard>
  //       ))
  //     }
  //   </div>
  // </div>
  // ) : (
  //   <div className="empty">
  //     <p> il n'y a pas d'éléments de cette catégorie</p>
  //     <p>Nous en rajouterons Merci</p>
  //   </div>
  // );
 
}

export default MoviesBox