import { CollectionConfig } from 'payload/types';

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: 'Project',
    plural: 'Projects',
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: 'Project Title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'client',
      label: 'Client',
      type: 'relationship',
      relationTo: 'clients', // Ensuring this links to the Clients collection
      required: true,
    },
    {
      name: 'startDate',
      label: 'Start Date',
      type: 'date',
      required: true,
    },
    {
      name: 'endDate',
      label: 'End Date',
      type: 'date',
    },
    {
      name: 'status',
      label: 'Project Status',
      type: 'select',
      options: [
        { label: 'Not Started', value: 'not_started' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Completed', value: 'completed' },
        { label: 'On Hold', value: 'on_hold' },
        { label: 'Canceled', value: 'canceled' },
      ],
      defaultValue: 'not_started',
    },
    {
      name: 'caseStudies',
      label: 'Case Studies',
      type: 'relationship',
      relationTo: 'case_studies',
      hasMany: true,
    },
    {
      name: 'testimonials',
      label: 'Testimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
    },

    {
      name: 'attachments',
      label: 'Project Files',
      type: 'array',
      fields: [
        {
          name: 'file',
          label: 'File',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'ai_assistant',
      label: 'Assigned AI Assistant',
      type: 'relationship',
      relationTo: 'ai_assistants', // Will be added next
    },
  ],
};

export default Projects;
