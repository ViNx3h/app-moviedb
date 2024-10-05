import { useRef } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import Card from './Card';



const HorizontalScroll = ({ data, heading }: { data: any; heading: string }) => {
    console.log(data);  // Make sure to log the correct data
    const containerRef = useRef();
    return (
        <div className="container mx-auto px-3 my-10">
            <h2 className="text-xl lg:text-2xl font-bold mb-2 text-white">{heading}</h2>
            <div className="overflow-hidden relative">
                <div className="grid grid-cols-[repeat(auto-fit,228px)] grid-flow-col overflow-x-scroll gap-8">
                    {data.map((item: any, index: number) => (
                        <Card key={item.id + "heading" + index} data={item} index={index + 1} trending={true} />
                    ))}

                </div>
                <div className='absolute top-0 flex justify-between w-full h-full items-center px-auto'>
                    <button className='bg-white p-1 text-black rounded-full ml-1'>
                        <FaAngleLeft />
                    </button>
                    <button className='bg-white p-1 text-black rounded-full mr-1'>
                        <FaAngleRight />
                    </button>
                </div>

            </div>
        </div>
    );
};


export default HorizontalScroll