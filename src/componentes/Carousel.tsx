'use client'
import { useState } from "react"
import { TestimonialCard} from "./CarouselCard"
import { faCircleUser, faWheelchairMove, faWheelchair, faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const testimonials = [
  {
    Icon: faCircleUser,
    Paragraph: "Excelente serviço! A equipe foi muito atenciosa e o produto superou minhas expectativas.",
    Name: "Ana Silva",
    Location: "São Paulo, Brasil"
  },
  {
    Icon: faCircleUser,
    Paragraph: "Muito satisfeito com a qualidade e rapidez. Recomendo para todos os meus amigos.",
    Name: "Carlos Pereira",
    Location: "Rio de Janeiro, Brasil"
  },
  {
    Icon: faCircleUser,
    Paragraph: "Atendimento impecável e produto de alta qualidade. Voltarei a comprar com certeza.",
    Name: "Mariana Costa",
    Location: "Belo Horizonte, Brasil"
  }
]

export function Carousel() {
  const [index, setIndex] = useState(0)

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const nextSlide = () => {
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className=" mx-auto bg-white rounded-lg shadow-lg p-6 mt-6">
      <div className="relative overflow-hidden">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${index * 100}%)` }}>
          {testimonials.map((item, i) => (
            <div key={i} className="flex-shrink-0 w-full px-4">
              <TestimonialCard {...item} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-6 mt-4">
        <button onClick={prevSlide} className="bg-green-700 text-white rounded-full p-3 shadow-md hover:bg-green-800">
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button onClick={nextSlide} className="bg-green-700 text-white rounded-full p-3 shadow-md hover:bg-green-800">
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </section>
  )
}
