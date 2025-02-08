import { CollectionAfterChangeHook } from 'payload/types';
import { generateAIContent } from '../../utilities/openai';

export const handleRewrites: CollectionAfterChangeHook = async ({ doc, previousDoc, operation, req }) => {
  try {
    if (operation !== 'update') return;

    // Check if the client rejected a post
    doc.socialMediaPosts?.forEach(async (post, index) => {
      if (post.approved === 'rejected') {
        console.log(`🔄 AI rewriting rejected social media post #${index + 1}`);
        const newText = await generateAIContent(post.postText, doc.clientComment || '');
        post.postText = newText;
        post.approved = 'pending';
      }
    });

    doc.blogPosts?.forEach(async (post, index) => {
      if (post.approved === 'rejected') {
        console.log(`🔄 AI rewriting rejected blog post #${index + 1}`);
        const newText = await generateAIContent(post.content, doc.clientComment || '');
        post.content = newText;
        post.approved = 'pending';
      }
    });
  } catch (error) {
    console.error(`❌ Error handling rewrites:`, error);
  }
};
