import * as placeServices from '../services/place.service';

export async function registerPlace(req, res, next) {
  try {
    const {
      // eslint-disable-next-line camelcase
      name, location, image_url, services,
    } = req.body;

    const { currentUserId } = req.params;
    const response = await placeServices.registerPlace({
      name,
      location,
      image_url,
      services,
      user_id: currentUserId,
    });

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}

export async function updatePlace(req, res, next) {
  try {
    const {
      // eslint-disable-next-line camelcase
      id, name, location, image_url, services,
    } = req.body;

    const { currentUserId } = req.params;
    const response = await placeServices.updatePlace({
      id, name, location, image_url, services, currentUserId,
    });

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}


export async function getListPlaces(req, res, next) {
  try {
    const response = await placeServices.getListPlaces();

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}

export async function getRegisteredPlaces(req, res, next) {
  try {
    const response = await placeServices.getRegisteredPlaces();

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}

export async function getPlace(req, res, next) {
  try {
    const { id } = req.params;

    const response = await placeServices.getPlace({ id });

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}

export async function confirmRegistedPlace(req, res, next) {
  try {
    const { id, state } = req.body;
    const { currentUserId } = req.params;
    const response = await placeServices.confirmRegisteredPlace({ id, state, currentUserId });

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}

export async function removePlace(req, res, next) {
  try {
    const { currentUserId } = req.params;
    const { id } = req.body;
    const response = await placeServices.removePlace({ id, currentUserId });

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}


export async function ratePlace(req, res, next) {
  try {
    const { rate_score } = req.body;
    const { currentUserId, id } = req.params;
    const response = await placeServices.ratePlace({ id, rate_score, currentUserId });

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}

export async function searchPlaces(req, res, next) {
  try {
    const { name, location, rate_score } = req.query;

    const response = await placeServices.searchPlaces({ name, location, rate_score });

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}
