import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonItem, IonLabel, IonList, IonModal, IonRow, IonToolbar } from '@ionic/react';
import React from 'react';

interface InfoMoviesProps {
     open: boolean,
     setOpen: any,
     data: any
}

const API_IMG = "https://image.tmdb.org/t/p/w500/";




const Info:React.FC<InfoMoviesProps> = ({open, setOpen, data}) => {

     const showMovieTV = (
          <>
               <IonImg src={API_IMG + data.poster_path} />
               <IonList lines='none' inset={true}>
                    <IonItem>
                         <h5>{data.hasOwnProperty('title') ? data.title : data.name}</h5>
                    </IonItem>
                    <IonItem>
                         <IonLabel><strong>Date de sortie</strong>: {data.hasOwnProperty('release_date') ? data.release_date : data.first_air_date}</IonLabel>
                    </IonItem>
                    <IonItem>
                         <IonLabel><strong>Nombre de Votes</strong>: {data.vote_count}</IonLabel>
                    </IonItem>
                    <IonItem>
                         <IonLabel><strong>Moyenne de vote</strong>: {data.vote_average}%</IonLabel>
                    </IonItem>
                    <IonItem>
                         <IonLabel><strong>Popularité</strong>: {data.popularity}</IonLabel>
                    </IonItem>
                    <IonItem>
                         <p><strong>Synopsis</strong><br/><br/>{data.overview}</p>
                    </IonItem>
               </IonList>
          </>
     );

     const showBook = (
          <>
               <IonImg src={data.image_url} />
               <IonList lines='none' inset={true}>
                    <IonItem>
                         <h5>{data.title}</h5>
                    </IonItem>
                    <IonItem>
                         <IonLabel><strong>Auteur</strong>: {data.authors}</IonLabel>
                    </IonItem>
                    <IonItem>
                         <p><strong>Genres</strong>: {data.genres}</p>
                    </IonItem>
                    <IonItem>
                         <IonLabel><strong>Moyenne de vote</strong>: {data.rating}%</IonLabel>
                    </IonItem>
                    <IonItem>
                         <IonLabel><strong>Nombre de pages</strong>: {data.num_pages}</IonLabel>
                    </IonItem>
                    <IonItem>
                         <p><strong>Synopsis</strong><br/><br/>{data.description}</p>
                    </IonItem>
               </IonList>

          </>
     )
  
     return (
    <IonModal isOpen={open}>
          <IonHeader>
               <IonToolbar>
                    <IonButtons slot='end'>
                         <IonButton onClick={() => setOpen(false)}>Fermer</IonButton>
                    </IonButtons>
               </IonToolbar>
          </IonHeader>
          <IonContent className='ion-padding'>
               
               {
                    data?.type === 'book' ? (showBook) : (showMovieTV)
               }
               
          </IonContent>
    </IonModal>
  )
}

export default Info;