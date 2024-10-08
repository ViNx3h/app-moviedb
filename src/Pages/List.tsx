import { generateClient } from "aws-amplify/data";
import axios from "axios";
import { useEffect, useState } from "react";
import { Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>();
const List = () => {
    const [list, setList] = useState<Array<Schema["List"]["type"]>>([]);
    // const [data, setData] = useState<any>([]);
    useEffect(() => {
        client.models.List?.observeQuery()?.subscribe({
            next: (data) => setList([...data.items])
        })
    })


    const fetchData = async () => {
        try {
            {
                list.map((data) => {
                    const response = axios.get(`/${data.media_type}/${data.id}`);
                    // setData(response.data)
                    console.log("response", response);

                })
            }

        } catch (error) {
            console.log("error", error);

        }
    }



    console.log("list", list);
    useEffect(() => {
        fetchData();
    }, [])



    return (
        <div>
            {/* <div className="container mx-auto ">
                <h3 className="capitalize text-lg lg:text-xl font-semibold my-3">List:</h3>
                <div className="grid grid-cols-[repeat(auto-fit,220px)] gap-4 justify-center lg:justify-start">
                    {
                        list.map((detail: any, index) => {
                            return (
                                <Card data={detail} index={index + 1} media_type={detail.media_type} key={index} />
                            )

                        })
                    }
                </div>
            </div> */}

        </div>
    )
}

export default List