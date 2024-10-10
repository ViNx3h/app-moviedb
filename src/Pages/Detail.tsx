import { fetchAuthSession } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/data";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Schema } from '../../amplify/data/resource';
import Card from "../Components/Card";

const client = generateClient<Schema>();

const Detail = () => {
    const [data, setData] = useState<any>({});
    const [genres, setGenres] = useState([]);
    const [list, setList] = useState<Array<Schema["List"]["type"]>>([]);
    const [userId, setUserId] = useState<string | undefined>();
    // const [credits, setCredits] = useState([]);
    const params = useParams<any>();

    // console.log("params", params);

    const handleGetToken = async () => {
        const session = await fetchAuthSession();
        const username = session.tokens?.accessToken.payload.username;
        if (typeof username === 'string') {
            setUserId(username); // Only set data if it's a valid string
        }
        console.log("access token", session.tokens?.accessToken.payload.username)

    }

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
            await client.models.List?.create({
                id: params.id, name: data.original_title
                    || data.original_name, media_type: params.detail,
                user_id: userId,
            })

        } catch (error) {
            console.log("error", error)
        }

    }

    console.log("list schema", client.models);
    console.log("list", list);


    function handleDelete(id: any) {
        client.models.List.delete({ id: id })
    }

    useEffect(() => {
        client.models.List?.observeQuery()?.subscribe({
            next: (data) => setList([...data.items])
        })
    })

    useEffect(() => {
        fetchData();
        fetchCreditData();
    }, [])

    useEffect(() => {
        handleGetToken();

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
            <div className="flex gap-4 mt-2">
                <button onClick={handleAddList}
                    className="bg-white text-neutral-800 rounded p-2 hover:bg-gradient-to-l from-red-500
                 to-orange-500 shadow-md transition-all hover:scale-105">
                    Add to favorite
                </button>
                <button className="bg-white text-neutral-800 rounded p-2 
                hover:bg-gradient-to-l from-red-500 to-orange-500 shadow-md transition-all hover:scale-105"
                    onClick={() => handleDelete(params.id)}>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default Detail