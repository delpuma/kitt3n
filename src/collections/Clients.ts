import { CollectionConfig } from 'payload/types';
import { sendApprovalNotification } from '../hooks/afterChange/sendApprovalNotification';
import { handleRewrites } from '../hooks/afterChange/handleRewrites';

export const Clients: CollectionConfig = {
  slug: 'clients',
  labels: {
    singular: 'Client',
    plural: 'Clients',
  },
  hooks: {
    afterChange: [sendApprovalNotification, handleRewrites], // ✅ Combined hooks properly
  },
  admin: {
    useAsTitle: 'companyName',
  },
  fields: [
    {
      name: 'companyName',
      label: 'Company Name',
      type: 'text',
      required: true,
    },
    {
      name: 'contactPerson',
      label: 'Contact Person',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'schedulingPreferences',
      label: 'Preferred Posting Hours',
      type: 'group',
      fields: [
        {
          name: 'startHour',
          label: 'Start Posting From (24h format)',
          type: 'number',
          min: 0,
          max: 23,
          required: true,
          defaultValue: 9, // Default: 9 AM
        },
        {
          name: 'endHour',
          label: 'Stop Posting By (24h format)',
          type: 'number',
          min: 0,
          max: 23,
          required: true,
          defaultValue: 17, // Default: 5 PM
        },
      ],
    },
    {
      name: 'socialMediaPosts',
      label: 'AI Suggested Social Media Posts',
      type: 'array',
      fields: [
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
          label: 'Suggested Posting Date',
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
    },
    {
      name: 'blogPosts',
      label: 'AI Suggested Blog Posts',
      type: 'array',
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
          label: 'Suggested Posting Date',
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
          admin: {
            description: 'Approval status for blog posts',
          },
        },
      ],
    },
  ],
};

export default Clients;
