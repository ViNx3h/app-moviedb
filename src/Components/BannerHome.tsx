import { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import '../App.css';


interface MovieDBState {
    movieDBData: {
        bannerData: Array<{ backdrop_path: string; title?: string; name?: string; overview: string; vote_average: number; popularity: number }>;
        imageURL: string;
    };
}
const BannerHome = () => {



    const BannerData = useSelector((state: MovieDBState) => state.movieDBData.bannerData);
    const imageURL = useSelector((state: MovieDBState) => state.movieDBData.imageURL);
    const [currentImage, setCurrentImage] = useState(0);



    const handleNext = async () => {
        if (currentImage < BannerData.length - 1) {
            setCurrentImage(preve => preve + 1);
        } else {
            setCurrentImage(0);
        }
    }

    const handlePrevious = async () => {
        if (currentImage > 0) {
            setCurrentImage(preve => preve - 1)
        } else {
            setCurrentImage(BannerData.length - 1)
        }
    }

    useEffect(() => {
        const interval = setInterval(async () => {
            if (currentImage < BannerData.length - 1) {
                handleNext();
            } else {
                setCurrentImage(0);
            }
        }, 5000)
        return () => clearInterval(interval)
    }, [BannerData, imageURL])



    // console.log("banner home", BannerData)

    return (
        <section className='w-full h-full'>
            <div className='flex min-h-full max-h-[95vh] overflow-hidden'>

                {
                    BannerData.map((data: any) => {
                        // console.log(imageURL + data.backdrop_path)
                        return (
                            <div className=' min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-all' style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                <div className='w-full h-full'>
                                    <img
                                        src={imageURL + data.backdrop_path}
                                        className='h-full w-full object-cover'
                                    />

                                </div>

                                <div className='absolute top-0 w-full h-full hidden items-center justify-between px-3 group-hover:flex'>
                                    <button onClick={handlePrevious} className='bg-white p-2 rounded-full text-2xl z-10 text-black'>
                                        <FaAngleLeft />
                                    </button>
                                    <button onClick={handleNext} className='bg-white p-2 rounded-full text-2xl z-10 text-black'>
                                        <FaAngleRight />
                                    </button>
                                </div>

                                <div className='absolute top-0 w-full h-full bg-gradient-to-t from-neutral-800 to-transparent'>

                                </div>
                                <div className='container mx-auto'>
                                    <div className='w-full absolute bottom-0 max-w-md px-3'>
                                        <h3 className='font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl'>
                                            {data?.title || data?.name}
                                        </h3>
                                        <p className='text-ellipsis line-clamp-3 my-2'>
                                            {data.overview}
                                        </p>
                                        <div className='flex items-center gap-4'>
                                            <p>Rating: {Number(data.vote_average).toFixed(1)}</p>
                                            <span>|</span>
                                            <p>View: {Number(data.popularity.toFixed(1))}</p>
                                        </div>
                                        <button className='bg-white px-4 py-2 text-black font-bold rounded mt-4 hover:bg-gradient-to-l from-red-500 to-orange-500 shadow-md transition-all hover:scale-105'>
                                            Play now
                                        </button>
                                    </div>
                                </div>

                            </div>
                        )
                    })
                }

            </div>
        </section>
    )
}

export default BannerHome