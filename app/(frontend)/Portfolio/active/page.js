import { getProject } from "@/action/getProject";
import React from "react";
export default async function Projects(){
    const data = await getProject();
    console.log(data)
    return (
        <div>
            {data.map((item, index) => (
                <div key={index}>
                    <h1 className="text-2xl font-bold text-red-100">{item.title}</h1>
                    <p>{item.description}</p>
                </div>
            ))}
        </div>
    )
}