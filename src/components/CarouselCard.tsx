import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface TestimonialProps {
  Icon: IconDefinition;
  Paragraph: string;
  Name: string;
  Location: string;
}

export function TestimonialCard({ Icon, Paragraph, Name, Location }: TestimonialProps) {
  return (
    <div className="bg-stone-100 text-black rounded-lg p-4 flex flex-col items-center text-center shadow-md h-full justify-center">
      <FontAwesomeIcon
        icon={Icon}
        className="text-4xl text-gray-700 w-16 h-16 rounded-full mb-3"
      />
      <p className="mb-3 text-sm italic text-gray-700 line-clamp-4">“{Paragraph}”</p>
      <h3 className="font-semibold text-base text-gray-900">{Name}</h3>
      <p className="text-xs text-gray-600">{Location}</p>
    </div>
  );
}
