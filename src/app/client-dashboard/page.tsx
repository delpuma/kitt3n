import React from 'react';
import { getPayload } from '@/utilities/getPayload';

const ClientDashboard = async () => {
  const payload = await getPayload();
  const user = await payload.users.me();

  if (!user) {
    return <p>Please log in.</p>;
  }

  const client = await payload.find({
    collection: 'clients',
    where: { email: { equals: user.email } },
  });

  if (!client.docs.length) {
    return <p>No client account found.</p>;
  }

  const clientData = client.docs[0];

  return (
    <div>
      <h1>Welcome, {clientData.companyName}</h1>
      <h2>Review AI-Generated Social Posts</h2>
      <table>
        <thead>
          <tr>
            <th>Post</th>
            <th>Media</th>
            <th>Scheduled Date</th>
            <th>Comments</th>
            <th>Approval</th>
          </tr>
        </thead>
        <tbody>
          {clientData.socialMediaPosts.map((post) => (
            <tr key={post.id}>
              <td>{post.postText}</td>
              <td>
                {post.media && <img src={post.media.url} width="100px" />}
              </td>
              <td>{new Date(post.scheduledDate).toLocaleString()}</td>
              <td>
                <textarea defaultValue={post.clientComment || ''} />
              </td>
              <td>
                {post.approved === 'pending' ? (
                  <>
                    <button>Approve ✅</button>
                    <button>Reject ❌</button>
                  </>
                ) : (
                  <span>{post.approved.toUpperCase()}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Review AI-Generated Blog Posts</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Media</th>
            <th>Scheduled Date</th>
            <th>Comments</th>
            <th>Approval</th>
          </tr>
        </thead>
        <tbody>
          {clientData.blogPosts.map((blog) => (
            <tr key={blog.id}>
              <td>{blog.title}</td>
              <td>{blog.content.substring(0, 100)}...</td>
              <td>
                {blog.media && <img src={blog.media.url} width="100px" />}
              </td>
              <td>{new Date(blog.scheduledDate).toLocaleString()}</td>
              <td>
                <textarea defaultValue={blog.clientComment || ''} />
              </td>
              <td>
                {blog.approved === 'pending' ? (
                  <>
                    <button>Approve ✅</button>
                    <button>Reject ❌</button>
                  </>
                ) : (
                  <span>{blog.approved.toUpperCase()}</span>
                )}
              </td>
              <td>
  <input type="datetime-local" defaultValue={post.scheduledDate} />
</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientDashboard;
