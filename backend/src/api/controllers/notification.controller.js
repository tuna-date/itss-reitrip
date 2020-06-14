import * as notificationServices from '../services/notification.service';

export async function triggerNotification(req, res, next) {
  try {
    const { currentUserId } = req.params;
    const { actorId, notificationType, entityId } = req.body;

    const response = await notificationServices.triggerNotification({
      currentUserId,
      actorId,
      notificationType,
      entityId,
    });

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}

export async function getNotifications(req, res, next) {
  try {
    const { currentUserId } = req.params;

    const response = await notificationServices.getNotification({ currentUserId });

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}

export async function markSeenNotification(req, res, next) {
  try {
    const { id } = req.body;

    const response = await notificationServices.markSeenNotification({ id });

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}
