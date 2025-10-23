'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconDefinition } from "@fortawesome/fontawesome-svg-core"

interface CardProps{
    Icon: IconDefinition,
    Title: string,
    Paragraph: string 
}

export default function Card(Params: CardProps){
    return (
        <div className="bg-green-700 text-white p-6 rounded-lg h-[350px] w-[275px] flex flex-col justify-start items-center border border-green-700 shadow-lg">
            <div className="bg-white w-20 h-20 rounded-lg flex justify-center items-center">
                <FontAwesomeIcon icon={Params.Icon} className="text-green-700 text-3xl" />
            </div>
            <p className="mt-4 text-center text-l font-semibold">{Params.Title}</p>
            <p className="text-center mt-4">{Params.Paragraph}</p>
        </div>
    )
}