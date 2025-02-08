import { CollectionConfig } from 'payload/types';

export const AIAssistants: CollectionConfig = {
  slug: 'ai_assistants',
  labels: {
    singular: 'AI Assistant',
    plural: 'AI Assistants',
  },
  admin: {
    useAsTitle: 'name',
    hidden: ({ user }) => !user?.roles?.includes('admin'), // Hide for non-admins
  },
  access: {
    read: ({ req }) => req.user?.roles?.includes('admin'),
    update: ({ req }) => req.user?.roles?.includes('admin'),
    create: ({ req }) => req.user?.roles?.includes('admin'),
    delete: ({ req }) => req.user?.roles?.includes('admin'),
  },
  fields: [
    {
      name: 'name',
      label: 'AI Assistant Name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Purpose of AI Assistant',
      type: 'textarea',
    },
    {
      name: 'assignedClients',
      label: 'Assigned Clients',
      type: 'relationship',
      relationTo: 'clients',
      hasMany: true,
    },
    {
      name: 'settings',
      label: 'AI Settings',
      type: 'group',
      fields: [
        {
          name: 'tone',
          label: 'Tone of Voice',
          type: 'select',
          options: ['Professional', 'Casual', 'Technical', 'Humorous'],
        },
        {
          name: 'content_types',
          label: 'Content Types AI Can Generate',
          type: 'checkbox',
          options: [
            { label: 'Social Media Posts', value: 'social' },
            { label: 'Blog Articles', value: 'blog' },
            { label: 'Marketing Emails', value: 'email' },
            { label: 'Ad Copy', value: 'ads' },
          ],
        },
      ],
    },
    {
      name: 'history',
      label: 'AI Generated History',
      type: 'array',
      fields: [
        {
          name: 'client',
          label: 'Client',
          type: 'relationship',
          relationTo: 'clients',
          required: true,
        },
        {
          name: 'output',
          label: 'Generated Content',
          type: 'textarea',
        },
        {
          name: 'timestamp',
          label: 'Generated At',
          type: 'date',
        },
      ],
    },
  ],
};

export default AIAssistants;
