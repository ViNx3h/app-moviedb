import { useSelector } from "react-redux";

interface MovieDBState {
    movieDBData: {
        bannerData: Array<{ backdrop_path: string; title?: string; name?: string; overview: string; vote_average: number; popularity: number; poster_path: string }>;
        imageURL: string;
    };
}


const Card = (data: any, trending: boolean, index: any) => {

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
    console.log(data.data.poster_path)
    return (
        <div className="w-full max-w-[220px] h-80 overflow-hidden rounded">
            <img
                src={imageURL + data.data.poster_path}

            />
            {
                trending && (
                    <div>
                        #{index} Trending
                    </div>
                )
            }

        </div>
    )
}

export default Card