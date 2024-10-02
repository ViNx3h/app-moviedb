
// const client = generateClient<Schema>();

import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BannerHome from "./Components/BannerHome";
import Card from "./Components/Card";
import { setBannerData, setImageURL } from "./store/MovieSlice";


interface MovieDBState {
  movieDBData: {
    bannerData: Array<{ backdrop_path: string; title?: string; name?: string; overview: string; vote_average: number; popularity: number; poster_path: string }>;
    imageURL: string;
  };
}

function App() {
  const trendingData = useSelector((state: MovieDBState) => state.movieDBData.bannerData);

  const dispatch = useDispatch();

  const fetchTrendingData = async () => {
    try {
      const response = await axios.get('/trending/all/day');

      dispatch(setBannerData(response.data.results))

      // console.log("response", response.data.results)
    } catch (error) {
      console.log("error", error)
    }
  }

  const fetchConfiguration = async () => {
    try {
      const response = await axios.get('/configuration')

      dispatch(setImageURL(response.data.images.secure_base_url + "original"))

      // console.log("response", response.data.images.secure_base_url + "original")
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    fetchTrendingData();
    fetchConfiguration();
  }, [])



  return (

    <div>
      <BannerHome />
      <div className="container mx-auto px-3 my-10">
        <h2 className="text-xl lg:text-2xl font-bold mb-2">Trending Show</h2>
        <div className="grid grid-cols-[repeat(auto-fit,220px)] gap-8">
          {
            trendingData.map((data: any, index,) => {
              console.log(data)
              return (
                <Card key={data?.id} data={data} index={index + 1} />
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
