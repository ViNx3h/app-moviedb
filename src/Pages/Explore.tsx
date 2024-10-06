import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../Components/Card";



const Explore = () => {


    const [pageNo, setPageNo] = useState(1);
    const [data, setData] = useState([]);
    const [totalPageNo, setTotalPageNo] = useState(0);


    const params = useParams();

    // console.log("params", params.detail)

    const fetchData = async () => {
        try {
            const response = await axios.get(`/discover/${params.detail}`, {
                params: {
                    page: pageNo
                }
            })
            setData((preve) => {
                return [
                    ...preve,
                    ...response.data.results,
                ]
            })
            // console.log("data", response.data.total_pages)
            setTotalPageNo(response.data.total_pages)
        } catch (error) {
            console.log("error", error);
        }
    }

    const handleScroll = () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            setPageNo(preve => preve + 1)
        }
    }

    useEffect(() => {
        fetchData();

    }, [pageNo])

    useEffect(() => {
        setPageNo(1);
        setData([]);
        fetchData();
    }, [params.detail])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, [])
    return (
        <div className="pt-16">
            <div className="container mx-auto ">
                <h3 className="capitalize text-lg lg:text-xl font-semibold my-3">Popular {params.detail} show</h3>
                <div className="grid grid-cols-[repeat(auto-fit,220px)] gap-4 ">
                    {
                        data.map((detail: any, index) => {
                            return (
                                <Card data={detail} index={index + 1} media_type={params.detail} key={index} />
                            )

                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Explore