import {
  Place, User, Post, Upvote,
} from '../../models/index';
import errors from '../../helpers/errors';

async function getTotalUpvotes(post) {
  const upvotes = await post.getUpvotes();

  return upvotes.length;
}

export async function upvotePost(payload) {
  const upvote = await Upvote.findOrCreate({
    where: {
      user_id: payload.user_id,
      post_id: payload.id,
    },
  });

  return upvote;
}

export async function createPost(payload) {
  const post = await Post.create(payload);

  return post.toJSON();
}

export async function getListPosts(payload) {
  const listPosts = await Post.findAll({
    where: {
      place_id: payload.place_id,
    },
  });

  const response = [];
  await Promise.all(listPosts.map(async (item) => {
    const totalVotes = await getTotalUpvotes(item);
    response.push({ ...item.toJSON(), totalVotes });
  }));

  return response;
}

export async function getPost(payload) {
  const post = await Post.findByPk(payload.id);
  if (!post) throw new Error(errors.POST_NOT_FOUND);

  const totalUpvotes = await getTotalUpvotes(post);
  const response = { ...post.toJSON(), totalUpvotes };

  return response;
}


export async function updatePost(payload) {
  const post = await Post.findByPk(payload.id);

  post.content = payload.content;

  await post.save();

  return post.toJSON();
}

export async function removePost(payload) {
  const post = await Post.findByPk(payload.id);
  if (post.user_id !== payload.currentUserId) throw new Error(errors.NO_PRIVILEGE);
  post.destroy();

  return { status: 'Record deleted' };
}

export async function getCurrentUserPosts(payload) {
  const currentUser = await User.findByPk(payload.currentUserId);
  const posts = await currentUser.getPosts();

  const response = [];
  await Promise.all(posts.map(async (item) => {
    const place = await Place.findByPk(item.place_id);
    response.push({ ...item.toJSON(), place_name: place.name });
  }));

  return response;
}
