import { 
     IonCard,
     IonImg,
     IonSearchbar 
} from '@ionic/react'
import React, {useState} from 'react';
import './BookBox.css';

interface BooksProps {
     booksprops: any,
     setOpen: any,
     setData: any
 }

const BookBox: React.FC<BooksProps> = ({booksprops, setOpen, setData}) => {

     const [search, setSearch] = useState('');
     const [saveData, setSaveData] = useState([] as any);
     const [iskeyEnter, setIskeyEnter] = useState(false);

     const activeModal = (book: any, type: 'book') => {
          setData({...book, type: type});
          setOpen((open: boolean) => !open);
     }

  return (
    <div className='container'>
          <IonSearchbar
               placeholder="Rechercher un livre"
               value={search}
               onIonChange={e => setSearch(e.detail.value!)}
          />
          <div className="grid">

          {
               search ? (
                    booksprops.filter((book: any) => book.title.toLowerCase().includes(search.toLocaleLowerCase())).map((book: any, index: any) =>(
                         <IonCard key={index} onClick={() => activeModal(book, 'book')}>
                              <IonImg src={book.image_url} />
                         </IonCard>
                    ))
               ) : (
                    booksprops.map((book: any) => (
                         <IonCard key={book.id} onClick={() => activeModal(book, 'book')}>
                              <IonImg src={book.image_url} />
                         </IonCard>
                    ))
               )
          }
          </div>

    </div>
  )
}

export default BookBox