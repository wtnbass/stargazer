// @flow
import api from '../api';

const fetchLocalTimeline = async (param) => {
  const query = param ?
        Object.keys(param).reduce((sum, key) => `${sum}&${key}=${param[key]}` , '') :
        '';
  return await api('timelines/public?local' + query);
}

export function load() {
  return async (dispatch) => {
    try {
      dispatch(request());
      const katsus = await fetchLocalTimeline();
      dispatch(requestSuccess(katsus));
    } catch (error) {
      dispatch(requestFailure(error));
    }
  }
}

export function latest(since_id) {
  return async (dispatch, getState) => {
    try {
      dispatch(request());
      const katsus = await fetchLocalTimeline({since_id});
      const current = getState().timeline.local;

      dispatch(requestSuccess([
        ...katsus,
        ...current,
      ]));
    } catch (error) {
      dispatch(requestFailure(error));
    }
  }

}

export function older(max_id) {
  return async (dispatch, getState) => {
    try {
      dispatch(request());
      const katsus = await fetchLocalTimeline({max_id});
      const current = getState().timeline.local;

      dispatch(requestSuccess([
        ...current,
        ...katsus,
      ]));
    } catch (error) {
      dispatch(requestFailure(error));
    }
  }
}

const request = () => ({
  type: 'TIMELIME_REQUEST',
});

const requestSuccess = (katsus) => ({
  type: 'TIMELINE_REQUEST_SUCCESS',
  timeline: 'local',
  katsus,
});

const requestFailure = (error) => ({
  type: 'TIMELINE_REQUEST_FAILURE',
  error,
});
