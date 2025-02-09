import { CollectionConfig } from 'payload/types';

export const BlogPosts: CollectionConfig = {
  slug: 'blogPosts',
  labels: {
    singular: 'Blog Post',
    plural: 'Blog Posts',
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: 'Blog Title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      label: 'Blog Content',
      type: 'richText',
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
      name: 'client',
      label: 'Client',
      type: 'relationship', // ✅ Links BlogPosts to Clients
      relationTo: 'clients',
      required: true,
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

export default BlogPosts;
