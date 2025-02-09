import { CollectionConfig } from 'payload/types';
import slugify from '../utilities/slugify'; // Ensure this function exists

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Service',
    plural: 'Services',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'price', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [slugify],
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories', // Ensure Categories collection exists
      required: false,
    },
    {
      name: 'price',
      type: 'number',
      required: false,
      admin: {
        description: 'Enter the price if applicable.',
      },
    },
    {
      name: 'pricing_options',
      type: 'array',
      required: false,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'price',
          type: 'number',
          required: true,
        },
        {
          name: 'features',
          type: 'array',
          fields: [
            {
              name: 'feature',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'cta_text',
      type: 'text',
      required: false,
    },
    {
      name: 'cta_link',
      type: 'text',
      required: false,
    },
    {
      name: 'seo',
      type: 'json',
      required: false,
      admin: {
        description: 'SEO metadata for the service.',
      },
    },
  ],
};

export default Services;
