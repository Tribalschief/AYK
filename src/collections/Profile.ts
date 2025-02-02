import type { CollectionConfig } from 'payload'

export const Profile: CollectionConfig = {
  slug: 'Profile',
  admin:{
    useAsTitle: 'Pname',
  },
  fields: [
   {
    name: 'Pname',
    type: 'text',
    required: true,
  },
  {
    name: "Pdescription",
    type:"array",
    fields: [
      {
        name:"Description",
        type:"text",
        required:true,
      },
    ]
  },
  {
    name:"skills",
    type:"array",
    fields: [
      {
        name:"skillsName",
        type:"text",
        required:true,
      },
    ]
  },
  {
    name:"PImage",
    relationTo: "media",
    type:"upload",
  }
  ],
}

