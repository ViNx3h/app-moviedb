
// const client = generateClient<Schema>();

import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import BannerHome from "./Components/BannerHome";
import { setBannerData, setImageURL } from "./store/MovieSlice";


function App() {

  const dispatch = useDispatch();

  const fetchTrendingData = async () => {
    try {
      const response = await axios.get('/trending/all/day');

      dispatch(setBannerData(response.data.results))

      console.log("response", response.data.results)
    } catch (error) {
      console.log("error", error)
    }
  }

  const fetchConfiguration = async () => {
    try {
      const response = await axios.get('/configuration')

      dispatch(setImageURL(response.data.images.secure_base_url + "original"))

      console.log("response", response.data.images.secure_base_url + "original")
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    fetchTrendingData();
    fetchConfiguration();
  }, [])



  return (
    <main>
      <BannerHome />
    </main>
  );
}

export default App;
