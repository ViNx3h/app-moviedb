import { useSelector } from "react-redux";

interface MovieDBState {
    movieDBData: {
        bannerData: Array<{ backdrop_path: string; title?: string; name?: string; overview: string; vote_average: number; popularity: number; poster_path: string }>;
        imageURL: string;
    };
}


const Card = (data: any, index: any) => {
    const trending = false;
    // const dispatch = useDispatch();

    // const fetchTrendingData = async () => {
    //     try {
    //         const response = await axios.get('/trending/all/day');

    //         dispatch(setBannerData(response.data.results))

    //         // console.log("response", response.data.results)
    //     } catch (error) {
    //         console.log("error", error)
    //     }
    // }

    // const fetchConfiguration = async () => {
    //     try {
    //         const response = await axios.get('/configuration')

    //         dispatch(setImageURL(response.data.images.secure_base_url + "original"))

    //         // console.log("response", response.data.images.secure_base_url + "original")
    //     } catch (error) {
    //         console.log("error", error);
    //     }
    // }
    // useEffect(() => {
    //     fetchTrendingData();
    //     fetchConfiguration();
    // }, [])

    const imageURL = useSelector((state: MovieDBState) => state.movieDBData.imageURL)
    // console.log(data)
    return (
        <div className="w-full min-w-[220px] max-w-[220px] h-80 overflow-hidden rounded relative">
            <img
                src={imageURL + data.data.poster_path}

            />
            <div className="absolute top-4">
                {
                    trending && (
                        <div className="py-1 px-4 bg-black backdrop-blur-3xl ">
                            #{index} Trending
                        </div>
                    )
                }
            </div>

            <div className="absolute bottom-0 h-14 backdrop-blur-3xl w-full bg-neutral-600/40 p-2">
                <h2 className="text-ellipsis line-clamp-1 font-semibold">{data?.data.title || data?.data.name}</h2>
                <div className="text-sm text-neutral-400 flex justify-between">
                    {data?.data.release_date || data?.data.first_air_date}
                    <p className="bg-neutral-600 px-1 rounded-full">Rating: {Number(data?.data.vote_average).toFixed(1)}</p>
                </div>
            </div>
        </div>
    )
}

export default Card