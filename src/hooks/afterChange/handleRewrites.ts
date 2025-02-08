import { CollectionAfterChangeHook } from 'payload/types';
import { generateAIContent } from '../../utilities/openai';

export const handleRewrites: CollectionAfterChangeHook = async ({ doc, previousDoc, operation, req }) => {
  if (operation === 'update') {
    const updatedSocialMediaPosts = [...doc.socialMediaPosts];
    const updatedBlogPosts = [...doc.blogPosts];

    let needsUpdate = false;

    // Process Rejected Social Media Posts
    for (let i = 0; i < updatedSocialMediaPosts.length; i++) {
      const post = updatedSocialMediaPosts[i];
      const prevPost = previousDoc?.socialMediaPosts?.[i];

      if (post.approved === 'rejected' && prevPost?.approved !== 'rejected') {
        console.log(`🚀 AI Rewriting Rejected Social Media Post: ${post.postText}`);

        const aiPrompt = `Rewrite this social media post to be more engaging, following a ${doc.aiTone || 'professional'} tone.
        Consider the client's note: "${post.clientComment || 'No additional instructions.'}".
        Original Post: "${post.postText}"`;

        post.postText = await generateAIContent(aiPrompt);
        post.approved = 'pending'; // Reset to pending approval
        needsUpdate = true;
      }
    }

    // Process Rejected Blog Posts
    for (let i = 0; i < updatedBlogPosts.length; i++) {
      const post = updatedBlogPosts[i];
      const prevPost = previousDoc?.blogPosts?.[i];

      if (post.approved === 'rejected' && prevPost?.approved !== 'rejected') {
        console.log(`🚀 AI Rewriting Rejected Blog Post: ${post.title}`);

        const aiPrompt = `Rewrite this blog post to be more engaging, detailed, and valuable to the audience, following a ${doc.aiTone || 'professional'} tone.
        Consider the client's note: "${post.clientComment || 'No additional instructions.'}".
        Title: "${post.title}"
        Content: "${post.content}"`;

        post.content = await generateAIContent(aiPrompt);
        post.approved = 'pending'; // Reset to pending approval
        needsUpdate = true;
      }
    }

    if (needsUpdate) {
      console.log(`✅ AI-generated content updated and reset for client approval.`);
      return { ...doc, socialMediaPosts: updatedSocialMediaPosts, blogPosts: updatedBlogPosts };
    }
  }

  return doc;
};
