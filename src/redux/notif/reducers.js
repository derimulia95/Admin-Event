import { CLEAR_NOTIF, SET_NOTIF } from "./constans";

let initialState = { status: false, typeNotif: "", message: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_NOTIF:
      return {
        status: action.status,
        typeNotif: action.typeNotif,
        message: action.message,
      };

    case CLEAR_NOTIF:
      return { state: initialState };

    default:
      return state;
  }
}
