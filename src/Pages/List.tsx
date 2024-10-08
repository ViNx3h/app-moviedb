import { generateClient } from "aws-amplify/data";
import axios from "axios";
import { useEffect, useState } from "react";
import { Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>();
const List = () => {
    const [list, setList] = useState<Array<Schema["List"]["type"]>>([]);
    useEffect(() => {
        client.models.List?.observeQuery()?.subscribe({
            next: (data) => setList([...data.items])
        })
    })

    const fetchDataFromId = async () => {
        try {
            list.map((data) => {
                const response = axios.get(`/tv/${data.id}/lists`)
                console.log("response", response);
            })
        } catch (error) {
            console.log("error", error);
        }
    }
    // console.log("list", list);
    useEffect(() => {
        fetchDataFromId();
    }, [])


    return (
        <div>
            {
                list.map((data) => {
                    return (
                        <div>
                            {data.id}
                        </div>
                    )
                })
            }

        </div>
    )
}

export default List