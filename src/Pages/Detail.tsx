import { generateClient } from "aws-amplify/data";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../Components/Card";
import { Schema } from 'e:/Intern/app-moviedb/app-moviedb/amplify/data/resource';

const client = generateClient<Schema>();

const Detail = () => {
    const [data, setData] = useState<any>({});
    const [genres, setGenres] = useState([]);
    const [list, setList] = useState<Array<Schema["List"]["type"]>>([]);
    // const [credits, setCredits] = useState([]);
    const params = useParams();

    console.log("params", params);

    const fetchData = async () => {
        try {
            const response = await axios.get(`/${params.detail}/${params.id}`)
            setData(response.data)
            setGenres(response.data.genres)
            console.log("response", response.data)
        } catch (error) {
            console.log("error", error)
        }
    }

    const fetchCreditData = async () => {
        try {
            const response = await axios.get(`/${params.detail}/${params.id}/credits`)
            console.log("castData", response.data)
        } catch (error) {
            console.log("error", error)
        }
    }

    const handleAddList = async () => {
        try {
            await client.models.List?.create({ id: params.id, name: data.original_title || data.original_name })

        } catch (error) {
            console.log("error", error)
        }

    }

    console.log("list schema", client.models);


    useEffect(() => {
        client.models.List?.observeQuery()?.subscribe({
            next: (data) => setList([...data.items])
        })
    })

    useEffect(() => {
        fetchData();
        fetchCreditData();
    }, [])

    // console.log("isAdding", handleAddList);

    console.log("list", list);

    return (
        <div className="py-16 ml-14">
            <div className="container flex grid grid-cols-5 gap-5 ">
                <div className="">
                    <Card data={data} media_type={params.detail} />

                </div>
                <div className="border-solid border min-w-full col-span-4 p-2 flex pt-5 justify-evenly grid grid-cols-1">
                    <p className="font-semibold">Name: {data.name} || Original name : {data.original_name} {data.original_title}</p>
                    <p className="font-semibold"> Genres:
                        {
                            genres.map((data: any) => {
                                return (
                                    <>
                                        {data.name}
                                    </>
                                )
                            })
                        }
                    </p>
                    <p className="font-semibold">Original country: {data.origin_country}</p>
                    <p className="font-semibold">Original language: {data.original_language}</p>
                    <p className="font-semibold">Popularity : {data.popularity}</p>
                </div>
            </div>
            <br />
            <hr />
            <div>
                <h2 className="font-bold text-xl">Over view:</h2>
                <br />
                <p>{data.overview}</p>
            </div>
            <div className="">
                <button onClick={handleAddList} className="bg-white text-neutral-800 rounded p-2 hover:bg-gradient-to-l from-red-500 to-orange-500 shadow-md transition-all hover:scale-105">
                    Add to favorite
                </button>
            </div>
        </div>
    )
}

export default Detail