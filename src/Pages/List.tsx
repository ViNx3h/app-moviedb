import { generateClient } from "aws-amplify/data";
import axios from "axios";
import { useEffect, useState } from "react";
import { Schema } from "../../amplify/data/resource";
import Card from "../Components/Card";
import "../index.css";

const client = generateClient<Schema>();
const List = () => {
    const [list, setList] = useState<Array<Schema["List"]["type"]>>([]);
    const [data, setData] = useState<any[]>([]);
    const [mediaType, setMediaType] = useState<any>([]);

    useEffect(() => {
        client.models.List?.observeQuery()?.subscribe({
            next: (data) => setList([...data.items])
        })
    }, [])

    console.log("list", list);


    const fetchData = async () => {
        try {
            const fetchedData = await Promise.all(
                list.map(async (item) => {
                    const response = await axios.get(`/${item.media_type}/${item.id}`);
                    setMediaType((preve: any) => [...preve, item.media_type]);
                    // console.log("response", response);
                    return response.data;
                })
            );
            setData(fetchedData);
            // console.log("Fetched data:", fetchedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };



    console.log("data", data);
    console.log("media type", mediaType);


    useEffect(() => {
        fetchData();
    }, [])



    return (
        <div>
            <div className="container mx-auto py-16 pl-6">
                <h3 className="capitalize text-lg lg:text-xl font-semibold my-3 text-center">List</h3>
                <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-5 justify-center lg:justify-start">
                    {
                        data.map((detail: any, index: any) => {
                            return (
                                <Card data={detail} index={index + 1} media_type={mediaType[index]}
                                    key={index} />
                            )

                        })
                    }
                </div>
            </div>

        </div>
    )
}

export default List