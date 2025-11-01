'use client';
import { useState } from 'react';
import { TestimonialCard } from './CarouselCard';
import { faCircleUser, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const testimonials = [
  {
    Icon: faCircleUser,
    Paragraph: 'Excelente serviço! A equipe foi muito atenciosa e o produto superou minhas expectativas.',
    Name: 'Ana Silva',
    Location: 'São Paulo, Brasil',
  },
  {
    Icon: faCircleUser,
    Paragraph: 'Muito satisfeito com a qualidade e rapidez. Recomendo para todos os meus amigos.',
    Name: 'Carlos Pereira',
    Location: 'Rio de Janeiro, Brasil',
  },
  {
    Icon: faCircleUser,
    Paragraph: 'Atendimento impecável e produto de alta qualidade. Voltarei a comprar com certeza.',
    Name: 'Mariana Costa',
    Location: 'Belo Horizonte, Brasil',
  },
];

export function Carousel() {
  const [index, setIndex] = useState(0);

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="mx-auto bg-white rounded-xl shadow-md p-6 mt-6 max-w-xl">
      <div className="relative overflow-hidden h-[220px]">
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {testimonials.map((item, i) => (
            <div key={i} className="flex-shrink-0 w-full h-full px-2">
              <TestimonialCard {...item} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-3 mt-4">
        <button
          onClick={prevSlide}
          className="bg-gray-200 text-gray-700 rounded-full p-2 hover:bg-gray-300 transition"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button
          onClick={nextSlide}
          className="bg-gray-200 text-gray-700 rounded-full p-2 hover:bg-gray-300 transition"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </section>
  );
}
