import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import { IonIcon, IonImg } from "@ionic/react";
import { add } from "ionicons/icons";

const API_IMG = "https://image.tmdb.org/t/p/w500/";



interface SwiperProps {
     results: any
}

const Swipe: React.FC<SwiperProps> = ({results}) => {


     useEffect(() => {
      
     }, [])
     
     return(
          <Swiper
          spaceBetween={20}
      slidesPerView={4}
          >
               {
                    results.slice(0, 11).map((movie: any, index: number) => (
                         <SwiperSlide key={index}>
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