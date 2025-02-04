import { client } from "@/sanity/lib/client";


export async function getProject() {
  const query = `*[_type == "project"] {
    _id,
    title,
    category,
    "imageUrl": image.asset->url, 
    description,
    link,
    tags
  }`;

  const data = await client.fetch(query);
  return data;
}