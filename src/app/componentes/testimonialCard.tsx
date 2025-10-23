import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface TestimonialProps {
  Icon: IconDefinition,
  Paragraph: string,
  Name: string,
  Location: string,
}

export  function TestimonialCard({ Icon, Paragraph, Name, Location }: TestimonialProps) {
  return (
    <div className="bg-stone-100 text-black rounded-lg p-6 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition duration-300">
      <FontAwesomeIcon icon={Icon} className="text-6xl text-black w-24 h-24 rounded-full mb-4 p-2" />
      <p className="mb-4 font-light">“{Paragraph}”</p>
      <h3 className="font-semibold text-black text-xl">{Name}</h3>
      <p className="text-sm text-black">{Location}</p>
    </div>
  )
}
