'use client';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { TestimonialCard } from './CarouselCard';
import { faSmile, faStar, faHeart } from '@fortawesome/free-solid-svg-icons';
import avaliacaoService from '@/services/avaliacaoService';

const ICONS = [faSmile, faStar, faHeart];

interface Avaliacao {
  id: number;
  classificacao: number;
  comentario?: string;
  perfil: { nome: string };
}

interface Testimonial {
  Icon: typeof faStar;
  Paragraph: string;
  Name: string;
  Location: string;
}

function mapAvaliacaoToTestimonial(av: Avaliacao, index: number): Testimonial {
  return {
    Icon: ICONS[index % ICONS.length],
    Paragraph: av.comentario || 'Excelente atendimento!',
    Name: av.perfil?.nome || 'Cliente',
    Location: `Nota: ${av.classificacao}/5`,
  };
}

export function TestimonialCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    avaliacaoService
      .getAll({ limit: 10 })
      .then((data: { avaliacoes?: Avaliacao[] }) => {
        const lista: Avaliacao[] = data?.avaliacoes ?? [];
        if (lista.length > 0) {
          setTestimonials(lista.map(mapAvaliacaoToTestimonial));
        }
      })
      .catch(() => {});
  }, []);

  if (testimonials.length === 0) return null;

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
