
// const initialState = {
//     isLogged: false,
//     email: null,
//     isAdmin: false, 
// };
// function reducer(state, action){
//     switch(action.type){
//         case 'LOGIN':
//             return {
//                 isLogged: true,
//                 email:action.payload.email,
//                 isAdmin: action.payload.isAdmin,
//             };
//             case 'LOGOUT':
//                 return initialState;
//             default:
//                 throw new Error('Action type not found');
//     }
// }
// export {initialState, reducer }