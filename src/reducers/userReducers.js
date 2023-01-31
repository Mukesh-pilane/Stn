const initialData = {
    username: null,
    profilePic : null
}

const userReducers = (state=initialData, action) =>{
    switch(action.type){
        case "AUTH":
            const {id, data} = action.payload;

            return {
                data
            }
        default:
            return {
                data: null
            }
    }
}

export default userReducers