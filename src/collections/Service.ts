import { CollectionConfig } from "payload";

export const Service: CollectionConfig = {
  slug: "Service",
  labels: {
    singular: "Service",
    plural: "Services",
  },
  admin: {
    useAsTitle: 'ServiceName',
  },
  fields: [
    {
      name: "ServiceName",
      type: "text",
      required: true,
    },
    {
      name: "ServiceDescription",
      type: "textarea",
      required: true,
    },
    {
      name: "skills",
      type: "array",
      required: true,
      fields: [
        {
          name: "skillsName",
          type: "text",
          required: true,
        },
        {
          name: "skillsLevel",
          type: "number",
          required: true,
          min: 0,
          max: 100,
        },
        {
          name: "file",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
};

