import { starwarConstants } from '../_constants';

export function starwars(state = {}, action) {
  switch (action.type) {
    case starwarConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case starwarConstants.GETALL_SUCCESS:
      return {
        items: action.starwars
      };
    case starwarConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}