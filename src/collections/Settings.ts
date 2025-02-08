import { GlobalConfig } from 'payload/types';

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Site Settings',
  access: {
    read: () => true,
    update: ({ req }) => req.user?.role === 'admin', // Only admins can update settings
  },
  fields: [
    {
      name: 'openAIKey',
      label: 'OpenAI API Key',
      type: 'text',
      required: true,
      admin: {
        description: 'Enter your OpenAI API key here',
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
