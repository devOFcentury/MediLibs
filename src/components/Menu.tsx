import React, { useEffect, useRef, useState } from 'react';
import { API_GENRES } from "../API.js";
import './Menu.css';

import { 
     homeOutline,
     tvOutline,
     filmOutline,
     bookOutline
} from 'ionicons/icons';
import { 
     IonAccordion,
     IonAccordionGroup,
     IonContent,
     IonHeader,
     IonIcon,
     IonItem,
     IonLabel,
     IonMenu, 
     IonMenuToggle, 
     IonTitle, 
     IonToolbar
} from '@ionic/react';


interface Path {
     title: string,
     url: string,
     iosIcon: string,
     mdIcon: string
}

const paths: Path[] = [
     {
          title: 'Acceuil',
          url: '/acceuil',
          iosIcon: homeOutline,
          mdIcon: homeOutline
     },
     {
          title: 'Tv',
          url: '/tv',
          iosIcon: tvOutline,
          mdIcon: tvOutline
     },
     {
          title: 'Films',
          url: '/movies',
          iosIcon: filmOutline,
          mdIcon: filmOutline
     },
     {
          title: 'Livres',
          url: '/livres',
          iosIcon: bookOutline,
          mdIcon: bookOutline
     }
   
     
];

const Menu: React.FC = () => {

     const accordionGroup = useRef<null | HTMLIonAccordionGroupElement>(null);

     const [genres, setGenres] = useState([] as any);

     useEffect(() => {

          fetch(API_GENRES)
          .then(res => res.json())
          .then(res => setGenres(res.genres));

          if (!accordionGroup.current) {
               return;
          }

          accordionGroup.current.value = ['first', 'third'];
     }, []);

  return (
    <IonMenu contentId='main'>
          <IonHeader>
               <IonToolbar>
                    <IonTitle>Menu</IonTitle>
               </IonToolbar>
          </IonHeader>

          <IonContent>
               <IonAccordionGroup ref={accordionGroup} multiple={true}>
                    {
                         paths.map((item1, index) => {
                              if(index === 0) {
                                   return (
                                        <IonMenuToggle key={index} autoHide={false}>
                                             <IonItem  routerLink={item1.url} routerDirection="none">
                                                  <IonIcon icon={item1.iosIcon} slot="start"></IonIcon>
                                                  {item1.title}
                                             </IonItem>
                                        </IonMenuToggle>
                                   );
                              }

                              if(index === paths?.length - 1) {
                                   return (
                                        <IonMenuToggle key={index} autoHide={false}>
                                             <IonItem  routerLink={item1.url} routerDirection="none">
                                                  <IonIcon icon={item1.iosIcon} slot="start"></IonIcon>
                                                  {item1.title}
                                             </IonItem>
                                        </IonMenuToggle>
                                   );
                              }

                              return(
                                   <IonAccordion key={index} value={`${index}`}>
                                        <IonItem slot='header'>
                                             <IonIcon icon={item1.iosIcon} slot="start"></IonIcon>
                                             <IonLabel>{item1.title}</IonLabel>
                                        </IonItem>
                                        <IonMenuToggle autoHide={false} slot='content'>
                                                       <IonItem className='sous_menu'  routerLink={item1.url} routerDirection="none">
                                                            Mélangés
                                                       </IonItem>
                                        </IonMenuToggle>
                                   {
                                        genres.map((item2: any) => (

                                             <IonMenuToggle key={item2.id} autoHide={false} slot='content'>
                                                       <IonItem className='sous_menu' routerLink={`${item1.url}/${item2.name}/${item2.id}`} routerDirection="none">
                                                            {item2.name}
                                                       </IonItem>
                                             </IonMenuToggle>
                                                  
                                             ))
                                   }
                              </IonAccordion>
                              )
                              
                         })
                    }
               </IonAccordionGroup>
          </IonContent>
    </IonMenu>
  )
}

export default Menu;