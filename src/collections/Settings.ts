import { CollectionConfig } from 'payload/types';

export const Settings: CollectionConfig = {
  slug: 'settings',
  admin: {
    useAsTitle: 'name', // ✅ Ensures the title field exists
    group: 'Configuration', // Organizes under "Configuration" in the admin panel
  },
  access: {
    read: () => true, // ✅ Anyone can read settings
    update: ({ req }) => req.user?.role === 'admin', // ✅ Only admins can update
    create: () => false, // ❌ Prevents creating new settings
    delete: () => false, // ❌ Prevents deleting settings
  },
  fields: [
    {
      name: 'name',
      label: 'Settings Name',
      type: 'text',
      required: true,
      defaultValue: 'General Settings',
      admin: {
        description: 'This is the global settings entry',
        readOnly: true, // ✅ Prevents editing the name field
      },
    },
    {
      name: 'openAIKey',
      label: 'OpenAI API Key',
      type: 'text',
      required: true,
      access: {
        read: ({ req }) => req.user?.role === 'admin', // ✅ Only admins can see the key
        update: ({ req }) => req.user?.role === 'admin', // ✅ Only admins can edit
      },
      admin: {
        description: 'Enter your OpenAI API key here (hidden from non-admins)',
        condition: ({ user }) => user?.role === 'admin', // ✅ Hide from non-admins in UI
      },
    },
    {
      name: 'zapierWebhook',
      label: 'Zapier Webhook URL',
      type: 'text',
      admin: {
        description: 'Webhook for automated actions',
      },
    },
    {
      name: 'socialMediaAutoPost',
      label: 'Enable Auto Posting',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Automatically schedule & post approved content',
      },
    },
    {
      name: 'aiTone',
      label: 'AI Writing Style',
      type: 'select',
      options: [
        { label: 'Professional', value: 'professional' },
        { label: 'Casual', value: 'casual' },
        { label: 'Friendly', value: 'friendly' },
        { label: 'Persuasive', value: 'persuasive' },
      ],
      defaultValue: 'professional',
      admin: {
        description: 'How should the AI write posts?',
      },
    },
  ],
};

export default Settings;
