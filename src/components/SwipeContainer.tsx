import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import { IonIcon, IonImg } from "@ionic/react";

const API_IMG = "https://image.tmdb.org/t/p/w500/";



interface SwiperProps {
     results: any,
     setData: any,
     setOpen: any,
     type: 'book' | 'movie_Tv'
}

const Swipe: React.FC<SwiperProps> = ({results, setData, setOpen, type}) => {

     const activeModal = (movie: any, type?: 'book') => {
          setData({...movie, type: type});
          setOpen((open: boolean) => !open);
     }
     return(
          <Swiper
          spaceBetween={20}
      slidesPerView={4}
          >
               {
                    type === "movie_Tv" ? (
                         results.slice(0, 11).map((movie: any, index: number) => (
                              <SwiperSlide style={{cursor: 'pointer'}} key={index} onClick={() => activeModal(movie)}>
                                   <IonImg src={API_IMG+movie.poster_path}/>
                              </SwiperSlide>
                         ))
                    ) : (
                         results.map((movie: any, index: number) => (
                              <SwiperSlide style={{cursor: 'pointer'}} key={index} onClick={() => activeModal(movie, 'book')}>
                                   <IonImg src={movie.image_url}/>
                              </SwiperSlide>
                         ))
                    )
               }
               
          </Swiper>
     )
}

export default Swipe;