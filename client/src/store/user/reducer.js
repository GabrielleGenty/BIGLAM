
const initialState = {
    isLogged: false,
    email: '',
    isAdmin: false, 
};
function reducer(state, action){
    switch(action.type){
        case 'LOGIN':
            const {firstname ='',lastname='', email = '', isAdmin = false } = action.payload || {};
            return {
                isLogged: true,
                firstname :firstname,
                lastname:lastname,
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