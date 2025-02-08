import { CollectionConfig } from 'payload/types';

export const ClientsSocialMediaPosts: CollectionConfig = {
  slug: 'clients_social_media_posts',
  labels: {
    singular: 'Client Social Media Post',
    plural: 'Clients Social Media Posts',
  },
  admin: {
    useAsTitle: 'postText',
  },
  fields: [
    {
      name: 'client',
      label: 'Client',
      type: 'relationship',
      relationTo: 'clients',
      required: true,
    },
    {
      name: 'postText',
      label: 'Post Text',
      type: 'textarea',
      required: true,
    },
    {
      name: 'media',
      label: 'Attached Media',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'scheduledDate',
      label: 'Scheduled Posting Date',
      type: 'date',
      required: true,
    },
    {
      name: 'clientComment',
      label: 'Client Comments / Edit Requests',
      type: 'textarea',
    },
    {
      name: 'approved',
      label: 'Approval Status',
      type: 'select',
      options: [
        { label: 'Pending Approval', value: 'pending' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
      ],
      defaultValue: 'pending',
    },
  ],
};

export default ClientsSocialMediaPosts;
