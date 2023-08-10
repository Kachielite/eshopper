import { logoutAction } from './path-to-your-logout-action'; // Import your logout action

const authMiddleware = store => next => action => {
    if (action.type === 'your-api-error-action-type') {
        const errorResponse = action.payload.response;

        // Check for specific error status code indicating authentication issue
        if (errorResponse.status === 401) {
            // Dispatch logout action or other relevant actions
            store.dispatch(logoutAction()); // Replace with your logout action
        }
    }

    return next(action);
};

export default authMiddleware;