const initialState = {
  isLoding: false,
  local: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TIMELIME_REQUEST':
      return {
        ...state,
        isLoding: true,
      };

    case 'TIMELINE_REQUEST_SUCCESS':
      return {
        ...state,
        isLoding: false,
        [action.timeline]: action.katsus,
      };

    case 'TIMELINE_REQUEST_FAILURE':
      return {
        ...state,
        isLoding: true,
      };

    default:
      return state;
  }
}
