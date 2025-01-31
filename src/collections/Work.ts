import { CollectionConfig } from "payload";

export const Project: CollectionConfig = {
  slug: "projects",
  labels: {
    singular: "Project",
    plural: "Projects",
  },
  admin: {
    useAsTitle: 'projects_title',
  },
  fields: [
    {
      name: "projects_title",
      type: "text",
      required: true,
    },
    {
      name: "projects_category",
      type: "select",
      required: true,
      options: [
        { label: "Web Development", value: "web-development" },
        { label: "Design", value: "ui Ux" },
        { label: "Python Development", value: "AI" },
        { label: "Cloud Computing", value: "Cloud" },
      ],
    },
    {
      name: "project_image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "project_description",
      type: "textarea",
      required: true,
    },
    {
      name: "project__link",
      type: "text",
      required: false,
    },
    {
      name: "project_tags",
      type: "array",
      required: false,
      fields: [
        {
          name: "tag",
          type: "text",
        },
      ],
    },
  ],
};
