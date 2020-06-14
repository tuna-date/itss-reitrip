import { Comment } from '../../models/index';
import errors from '../../helpers/errors';

export async function createComment(payload) {
  const comment = await Comment.create(payload);

  return comment.toJSON();
}

export async function getListComments(payload) {
  const listComments = await Comment.findAll({
    where: {
      post_id: payload.post_id,
    },
  });

  return listComments;
}


export async function updateComment(payload) {
  const comment = await Comment.findByPk(payload.id);

  comment.content = payload.content;

  await comment.save();

  return comment.toJSON();
}

export async function removeComment(payload) {
  const comment = await Comment.findByPk(payload.id);
  if (comment.user_id !== payload.currentUserId) throw new Error(errors.NO_PRIVILEGE);
  comment.destroy();

  return { status: 'Record deleted' };
}
