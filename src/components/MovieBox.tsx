import { 
  IonCard, 
  IonImg, 
  IonSearchbar 
} from '@ionic/react';
import React, { useState } from 'react';
import { API_IMG } from "../API.js";
import './MovieBox.css';

interface MoviesProps {
    moviesprops: any,
    tv_movies: 'tv' | 'movie'
    simpleUrl: boolean,
    setOpen: any,
    setData: any
}

const MoviesBox: React.FC<MoviesProps> = ({ moviesprops, tv_movies, simpleUrl, setData, setOpen }) => {

  const [search, setSearch] = useState('');
  const [saveData, setSaveData] = useState([] as any);
  const [iskeyEnter, setIskeyEnter] = useState(false);

  const activeModal = (movie: any) => {
    setData({...movie});
    setOpen((open: boolean) => !open);
  }



  const handleKeypress = async (e: any) => {
    if(e.key === 'Enter' && search !== '') {
      const searchResponse = await fetch(`https://api.themoviedb.org/3/search/${tv_movies}?api_key=707b3d8f99f24b6c0a6fe07060abaf4d&query=${search}&language=fr-FR`);
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
            placeholder={`Recherher un ${tv_movies === 'movie' ?  'film': 'film tv'}`} 
            value={search} 
            onKeyPress={handleKeypress}
            onIonChange={e => {
              setSearch(e.detail.value!);
              if(e.detail.value! === '') {
                setIskeyEnter(false)
              }
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
              <IonCard key={index} onClick={() => activeModal(item)}>
                <IonImg className='te' src={item.poster_path ? (API_IMG+item.poster_path) : '../../assets/default-image.jpg'} alt='image du film' />
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
 
}

export default MoviesBox