import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    staticDir: "media",
    mimeTypes: ["image/png", "image/jpeg", "image/svg+xml"],
  },
  fields: [
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}