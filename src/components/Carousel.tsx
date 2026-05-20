import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { TestimonialCard } from './CarouselCard';
import { faSmile, faStar, faHeart } from '@fortawesome/free-solid-svg-icons';

const testimonials = [
  {
    Icon: faSmile,
    Paragraph: 'Excelente atendimento e suporte rápido!',
    Name: 'João Silva',
    Location: 'São Paulo, SP',
  },
  {
    Icon: faStar,
    Paragraph: 'Produto de alta qualidade, recomendo muito.',
    Name: 'Maria Oliveira',
    Location: 'Rio de Janeiro, RJ',
  },
  {
    Icon: faHeart,
    Paragraph: 'Fiquei encantado com a experiência!',
    Name: 'Carlos Mendes',
    Location: 'Belo Horizonte, MG',
  },
  {
    Icon: faStar,
    Paragraph: 'Atendimento impecável e soluções rápidas',
    Name: 'Fernanda Costa',
    Location: 'Curitiba, PR',
  },
  {
    Icon: faSmile,
    Paragraph: 'Equipe muito profissional e dedicada',
    Name: 'Rafael Lima',
    Location: 'Porto Alegre, RS',
  }

];

export function TestimonialCarousel() {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      loop={true}
      autoplay={{ delay: 2000 }}
    >
      {testimonials.map((testimonial, index) => (
        <SwiperSlide key={index}>
          <TestimonialCard {...testimonial} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
