import { Sequelize } from 'sequelize';
import { mysqlConfig } from '../config/database.config';
import { commentFields } from './Comment';
import { notificationFields } from './Notification';
import { notificationChangeFields } from './NotificationChange';
import { notificationObjectFields } from './NotificationObject';
import { placeFields } from './Place';
import { postFields } from './Post';
import { rateFields } from './Rate';
import { upvoteFields } from './Upvote';
import { userFields } from './User';


const sequelize = new Sequelize(mysqlConfig);

// Define tables
const Comment = sequelize.define('comment', commentFields);
const Notification = sequelize.define('notification', notificationFields);
const NotificationChange = sequelize.define('notification_change', notificationChangeFields);
const NotificationObject = sequelize.define('notification_object', notificationObjectFields);
const Place = sequelize.define('place', placeFields);
const Post = sequelize.define('post', postFields);
const Rate = sequelize.define('rate', rateFields);
const Upvote = sequelize.define('upvote', upvoteFields);
const User = sequelize.define('user', userFields);

// Define relationship
User.hasMany(Place);
Place.belongsTo(User, { foreignKey: 'user_id' });


Place.hasMany(Post, { onDelete: 'CASCADE' });
Post.belongsTo(Place, { foreignKey: 'place_id' });

Place.hasMany(Rate, { onDelete: 'CASCADE' });
Rate.belongsTo(Place, { foreignKey: 'place_id' });

User.hasMany(Rate, { onDelete: 'CASCADE' });
Rate.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Post, { onDelete: 'CASCADE' });
Post.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Upvote, { onDelete: 'CASCADE' });
Upvote.belongsTo(User, { foreignKey: 'user_id' });

Post.hasMany(Comment, { onDelete: 'CASCADE' });
Comment.belongsTo(Post, { foreignKey: 'post_id' });

User.hasMany(Comment, { onDelete: 'CASCADE' });
Comment.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(NotificationChange, { onDelete: 'CASCADE', foreignKey: 'actor_id' });
NotificationChange.belongsTo(User, { foreignKey: 'actor_id' });

User.hasMany(Notification, { onDelete: 'CASCADE', foreignKey: 'notifier_id' });
Notification.belongsTo(User, { foreignKey: 'notifier_id' });

NotificationObject.hasMany(NotificationChange, { onDelete: 'CASCADE' });
NotificationChange.belongsTo(NotificationObject, { foreignKey: 'notification_object_id' });


NotificationObject.hasMany(Notification, { onDelete: 'CASCADE' });
Notification.belongsTo(NotificationObject, { foreignKey: 'notification_object_id' });


export {
  sequelize,
  Comment,
  Notification,
  NotificationObject,
  NotificationChange,
  Place,
  Post,
  Rate,
  Upvote,
  User,
};
