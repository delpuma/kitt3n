import { CollectionConfig } from 'payload/types';

export const CaseStudies: CollectionConfig = {
  slug: 'case_studies',
  labels: {
    singular: 'Case Study',
    plural: 'Case Studies',
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: 'Case Study Title',
      type: 'text',
      required: true,
    },
    {
      name: 'project',
      label: 'Related Project',
      type: 'relationship',
      relationTo: 'projects', // Links to Projects Collection
      required: true,
    },
    {
      name: 'client',
      label: 'Client',
      type: 'relationship',
      relationTo: 'clients',
      required: true,
    },
    {
      name: 'problem',
      label: 'Problem / Challenge',
      type: 'textarea',
      required: true,
    },
    {
      name: 'solution',
      label: 'Solution Implemented',
      type: 'textarea',
      required: true,
    },
    {
      name: 'results',
      label: 'Results Achieved',
      type: 'textarea',
      required: true,
    },
    {
      name: 'metrics',
      label: 'Key Performance Metrics',
      type: 'array',
      fields: [
        {
          name: 'metric',
          label: 'Metric',
          type: 'text',
        },
        {
          name: 'value',
          label: 'Value',
          type: 'text',
        },
      ],
    },
    {
      name: 'testimonials',
      label: 'Related Testimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
    },
    {
      name: 'published',
      label: 'Published',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
};

export default CaseStudies;
