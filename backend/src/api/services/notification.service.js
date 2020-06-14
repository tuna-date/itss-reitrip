import * as entities from '../../models';
import constants from '../../helpers/constants';

async function createNotificationActor(actorId, notifObjId) {
  return entities.NotificationChange.create({
    actor_id: actorId,
    notification_object_id: notifObjId,
  });
}

async function createNotificationObject(notificationType, entityId) {
  return entities.NotificationObject.create({
    notification_type: notificationType,
    entity_id: entityId,
  });
}

async function createNotification(notifierId, notifObjId) {
  return entities.Notification.create({
    notification_object_id: notifObjId,
    notifier_id: notifierId,
    status: constants.notificationStatus.NEW,
  });
}

async function getSubmitNewPlaceNotifiers() {
  const notifiers = [];
  const admins = await entities.User.findAll({
    where: {
      role: constants.userRole.ADMIN,
    },
  });

  // eslint-disable-next-line array-callback-return
  await Promise.all(admins.map((admin) => {
    notifiers.push(admin.id);
  }));

  return notifiers;
}

async function getConfirmNewPlaceNotifiers(entityId) {
  const notifiers = [];

  const place = await entities.Place.findByPk(entityId);
  const users = await entities.User.findAll({
    where: {
      id: place.user_id,
    },
  });

  // eslint-disable-next-line array-callback-return
  await Promise.all(users.map((user) => {
    notifiers.push(user.id);
  }));

  return notifiers;
}


async function getCommentOnPostNotifiers(entityId) {
  const notifiers = [];

  const post = await entities.Post.findByPk(entityId);
  const postOwner = await entities.User.findAll({
    where: {
      id: post.user_id,
    },
  });
  const postComments = await post.getComments();

  notifiers.push(postOwner.id);

  // eslint-disable-next-line array-callback-return
  await Promise.all(postComments.map((comment) => {
    notifiers.push(comment.user_id);
  }));

  return notifiers;
}

async function getUpvotePostNotifiers(entityId) {
  const notifiers = [];

  const post = await entities.Post.findByPk(entityId);
  const users = await entities.User.findAll({
    where: {
      id: post.user_id,
    },
  });

  // eslint-disable-next-line array-callback-return
  await Promise.all(users.map((user) => {
    notifiers.push(user.id);
  }));

  return notifiers;
}


export async function triggerNotification(payload) {
  const notifObj = await createNotificationObject(payload.notificationType, payload.entityId);
  await createNotificationActor(payload.actorId, notifObj.id);

  let notifiers;

  switch (payload.notificationType) {
    case constants.notificationType.SUBMIT_NEW_PLACE:
      notifiers = await getSubmitNewPlaceNotifiers();
      break;
    case constants.notificationType.CONFIRM_NEW_PLACE:
      notifiers = await getConfirmNewPlaceNotifiers(payload.entityId);
      break;
    case constants.notificationType.COMMENT_ON_POST:
      notifiers = await getCommentOnPostNotifiers(payload.entityId);
      break;
    case constants.notificationType.UPVOTE_POST:
      notifiers = await getUpvotePostNotifiers(payload.entityId);
      break;
    default:
      break;
  }

  await Promise.all(notifiers.map(async (notifier) => {
    await createNotification(notifier, notifObj.id);
  }));

  return { isOk: true };
}

export async function getNotification(payload) {
  const notifications = await entities.Notification.findAll({
    where: {
      notifier_id: payload.currentUserId,
    },
  });

  const response = [];

  // eslint-disable-next-line array-callback-return
  await Promise.all(notifications.map(async (notification) => {
    const notifObj = await entities.NotificationObject.findByPk(
      notification.notification_object_id,
    );
    const notifActors = await entities.NotificationChange.findAll({
      where: {
        id: notifObj.id,
      },
    });

    const notifActorNames = await Promise.all(notifActors.map(async (notifActor) => {
      const user = await entities.User.findByPk(notifActor.actor_id);
      return user.username;
    }));

    response.push({
      id: notification.id,
      notifierId: notification.notifier_id,
      notificationType: notifObj.notification_type,
      entityId: notifObj.entity_id,
      actorNames: notifActorNames,
      status: notification.status,
    });
  }));

  return response;
}

export async function markSeenNotification(payload) {
  const notification = await entities.Notification.findByPk(payload.id);
  notification.status = constants.notificationStatus.SEEN;

  await notification.save();

  return notification;
}
