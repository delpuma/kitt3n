import { CollectionConfig } from 'payload/types';

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonial',
    plural: 'Testimonials',
  },
  admin: {
    useAsTitle: 'clientName',
  },
  fields: [
    {
      name: 'clientName',
      label: 'Client Name',
      type: 'text',
      required: true,
    },
    {
      name: 'company',
      label: 'Company Name',
      type: 'text',
    },
    {
      name: 'position',
      label: 'Client Position',
      type: 'text',
    },
    {
      name: 'testimonial',
      label: 'Testimonial',
      type: 'textarea',
      required: true,
    },
    {
      name: 'rating',
      label: 'Star Rating (1-5)',
      type: 'number',
      min: 1,
      max: 5,
      required: true,
    },
    {
      name: 'project',
      label: 'Related Project',
      type: 'relationship',
      relationTo: 'projects',
    },
    {
      name: 'caseStudy',
      label: 'Related Case Study',
      type: 'relationship',
      relationTo: 'case_studies',
    },
    {
      name: 'clientPhoto',
      label: 'Client Photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'published',
      label: 'Published',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
};

export default Testimonials;
