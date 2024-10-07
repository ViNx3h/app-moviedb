import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
    const [data, setData] = useState([]);
    const params = useParams();

    console.log("params", params);

    const fetchData = async () => {
        try {
            const response = await axios.get(`/${params.detail}/${params.id}`)
            console.log("response", response.data)
        } catch (error) {
            console.log("error", error)
        }
    }

    const fetchCreditData = async () => {
        try {
            const response = await axios.get(`/${params.detail}/${params.id}/credits`)
            console.log("castData", response)
        } catch (error) {
            console.log("error", error)
        }
    }

    useEffect(() => {
        fetchData();
        fetchCreditData();
    }, [])


    return (
        <div>Detail</div>
    )
}

export default Detail