import { FieldHook } from 'payload/types';

const slugify: FieldHook = ({ value, data }) => {
  if (typeof value === 'string') {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Remove duplicate hyphens
  }

  if (data?.title) {
    return data.title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  return value;
};

export default slugify;
