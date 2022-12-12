import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonItem, IonLabel, IonList, IonModal, IonRow, IonToolbar } from '@ionic/react';
import React from 'react';

interface InfoMoviesProps {
     open: boolean,
     setOpen: any,
     data: any
}

const API_IMG = "https://image.tmdb.org/t/p/w500/";


const InfoMovie:React.FC<InfoMoviesProps> = ({open, setOpen, data}) => {
  
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
               <IonImg src={API_IMG + data.poster_path} />
               <IonList lines='none' inset={true}>
                    <IonItem>
                         <h5>{data.hasOwnProperty('title') ? data.title : data.name}</h5>
                    </IonItem>
                    <IonItem>
                         <IonLabel>Date de sortie: {data.hasOwnProperty('release_date') ? data.release_date : data.first_air_date}</IonLabel>
                    </IonItem>
                    <IonItem>
                         <IonLabel>Nombre de Votes: {data.vote_count}</IonLabel>
                    </IonItem>
                    <IonItem>
                         <IonLabel>Moyenne de vote: {data.vote_average}%</IonLabel>
                    </IonItem>
                    <IonItem>
                         <IonLabel>Popularité: {data.popularity}</IonLabel>
                    </IonItem>
                    <IonItem>
                         <p><strong>Synopsis</strong><br/><br/>{data.overview}</p>
                    </IonItem>
               </IonList>
                    
               
          </IonContent>
    </IonModal>
  )
}

export default InfoMovie