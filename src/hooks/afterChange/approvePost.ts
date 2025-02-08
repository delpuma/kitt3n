import { PayloadRequest } from 'payload/types';

export const approvePost = async ({ doc, req }: { doc: any; req: PayloadRequest }) => {
  if (doc.approved === 'approved') {
    await req.payload.create({
      collection: 'scheduledPosts',
      data: {
        client: doc.client,
        postText: doc.postText,
        media: doc.media,
        postDate: doc.scheduledDate,
        status: 'scheduled',
      },
    });
  }
};
