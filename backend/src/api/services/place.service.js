import { Place, User, Rate } from '../../models/index';
import errors from '../../helpers/errors';
import constants from '../../helpers/constants';

async function adminChecker(currentUserId) {
  const user = await User.findByPk(currentUserId);

  if (user.role !== constants.userRole.ADMIN) throw new Error(errors.NOT_ADMIN);
}

async function getAverageRate(place) {
  const rates = await place.getRates();

  if (rates.length === 0) return 5;

  const totalScore = await rates.reduce(
    (sum, item) => sum + item.rate_score,
    0,
  );

  return totalScore / rates.length;
}

export async function ratePlace(payload) {
  const rate = Rate.build({
    user_id: payload.currentUserId,
    place_id: payload.id,
    rate_score: payload.rate_score,
  });

  await rate.save();
  return rate.toJSON();
}

export async function registerPlace(payload) {
  const place = Place.build(payload);
  await place.save();

  return place.toJSON();
}

export async function getListPlaces() {
  const listPlaces = await Place.findAll({
    where: {
      state: constants.registedPlaceStatus.CONFIRMED,
    },
  });

  const response = [];
  await Promise.all(listPlaces.map(async (item) => {
    const averageRate = await getAverageRate(item);
    response.push({ ...item.toJSON(), averageRate });
  }));

  return response;
}

export async function getPlace(payload) {
  const place = await Place.findByPk(payload.id);
  if (!place) throw new Error(errors.PLACE_NOT_FOUND);

  const averageRate = await getAverageRate(place);
  const response = { ...place.toJSON(), averageRate };

  return response;
}

export async function getRegisteredPlaces() {
  const registeredPlaces = await Place.findAll({
    where: {
      state: constants.registedPlaceStatus.PENDING,
    },
  });

  return registeredPlaces;
}

export async function confirmRegisteredPlace(payload) {
  await adminChecker(payload.currentUserId);

  const place = await Place.findByPk(payload.id);

  if (!place) throw new Error(errors.PLACE_NOT_FOUND);

  place.state = payload.state;
  await place.save();
  return place;
}

export async function updatePlace(payload) {
  await adminChecker(payload.currentUserId);

  const place = await Place.findByPk(payload.id);

  if (payload.name) place.name = payload.name;
  if (payload.location) place.location = payload.location;
  if (payload.services) place.services = payload.services;
  if (payload.image_url) place.image_url = payload.image_url;

  await place.save();

  return place.toJSON();
}

export async function removePlace(payload) {
  await adminChecker(payload.currentUserId);

  const place = await Place.findByPk(payload.id);
  place.destroy();

  return { status: 'Record deleted' };
}

export async function searchPlaces(payload) {
  const { name, location } = payload;
  let queryParams = {};

  if (name) queryParams = { ...queryParams, name };
  if (location) queryParams = { ...queryParams, location };

  const searchedPlaces = await Place.findAll({
    where: {
      ...queryParams,
    },
  });

  const rate_score = payload.rate_score || 0;

  const response = [];
  await Promise.all(searchedPlaces.map(async (item) => {
    const averageRate = await getAverageRate(item);
    if (averageRate >= rate_score) response.push({ ...item.toJSON(), averageRate });
  }));

  return response;
}
