import { defineType } from 'sanity';

export const projects = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Web Development', value: 'Web Development'},
          {title: 'Ui/Ux', value: 'Design'},
          {title: 'Mobile Development', value: 'Mobile Development'},
          {title: 'Data Science', value: 'Data Science'},

          {title: 'IoT', value: 'IoT'},
          {title: 'Blockchain', value: 'Blockchain'}
        ],
        layout: 'dropdown'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required()
    },
    {
      name: 'link',
      title: 'Link',
      type: 'url',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https', '#']
      })
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      },
      validation: Rule => Rule.required().min(1)
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      category: 'category'
    },
    prepare(selection) {
      const {category} = selection
      return {
        ...selection,
        subtitle: category
      }
    }
  }
})