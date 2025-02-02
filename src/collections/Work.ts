import { CollectionConfig } from "payload";

export const Project: CollectionConfig = {
  slug: "projects",
  labels: {
    singular: "Project",
    plural: "Projects",
  },
  admin: {
    useAsTitle: 'projectTitle',
  },
  fields: [
    {
      name: "projectTitle",
      type: "text",
      required: true,
    },
    {
      name: "projectsCategory",
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
      name: "projectImage",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "projectDescription",
      type: "textarea",
      required: true,
    },
    {
      name: "projectLink",
      type: "text",
      required: false,
    },
    {
      name: "projectTags",
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
