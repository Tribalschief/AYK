import type { CollectionConfig } from 'payload'

export const Profile: CollectionConfig = {
  slug: 'Profile',
  fields: [
   {
    name: 'name',
    type: 'text',
    required: true,
  },
  {
    name: "description",
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
        name:"name",
        type:"text",
        required:true,
      },
    ]
  },
  {
    name:"image",
    relationTo: "media",
    type:"upload",
  }
  ],
}

