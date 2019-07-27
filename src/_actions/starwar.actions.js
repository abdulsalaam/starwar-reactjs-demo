import { starwarConstants } from '../_constants';
import { starwarService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const starwarActions = {
    getAll
};

function getAll() {
    return dispatch => {
        dispatch(request());

        starwarService.getAll()
            .then(
                starwars => dispatch(success(starwars)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: starwarConstants.GETALL_REQUEST } }
    function success(starwars) { return { type: starwarConstants.GETALL_SUCCESS, starwars } }
    function failure(error) { return { type: starwarConstants.GETALL_FAILURE, error } }
}
