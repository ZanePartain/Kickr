

const initialState ={
    login: false,
    user: null
};

//NOTE:  need to use a Redux middleware, 
//     this way we can have storage for current state status
//     when refreshing

const reducer = (state = initialState, action) =>{
    const newState = {...state};

    switch (action.type){
        case 'TOGGLE_LOGIN':
            newState.login = !newState.login;
            if (newState.login === false){
                newState.user = null;
            }
            break;
        case 'USERNAME':
            newState.user = action.val;
            console.log("reducer USER: ", newState.user)
            break;
    }

    return newState;
};

export default reducer;