
const initialState = {
    isLogged: false,
    email: '',
    isAdmin: false, 
};
function reducer(state, action){
    switch(action.type){
        case 'LOGIN':
            const { email = '', isAdmin = false } = action.payload || {};
            return {
                isLogged: true,
                email:email,
                isAdmin: isAdmin,
            };
            case 'LOGOUT':
                return initialState;
            default:
                throw new Error('Action type not found');
    }
}
export {initialState, reducer }