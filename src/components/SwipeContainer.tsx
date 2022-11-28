import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import { IonIcon, IonImg } from "@ionic/react";
import { add } from "ionicons/icons";

const API_IMG = "https://image.tmdb.org/t/p/w500/";



interface SwiperProps {
     results: any,
     setData: any,
     setOpen: any
}

const Swipe: React.FC<SwiperProps> = ({results, setData, setOpen}) => {


     const activeModal = (movie: any) => {
          setData({...movie});
          setOpen((open: boolean) => !open);
     }
     return(
          <Swiper
          spaceBetween={20}
      slidesPerView={4}
          >
               {
                    results.slice(0, 11).map((movie: any, index: number) => (
                         <SwiperSlide key={index} onClick={() => activeModal(movie)}>
                              <IonImg src={API_IMG+movie.poster_path}/>
                         </SwiperSlide>
                    ))
               }
               <SwiperSlide>
                    <IonIcon icon={add} size="large" color="warning" />
               </SwiperSlide>
               
          </Swiper>
     )
}

export default Swipe;