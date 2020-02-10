export default {
    setUser(state, user){
        state.user = user;
    },

    setCurrentUser(state, user){
        state.currentUser = user;
    },
    setIsMe(state){
        state.isMe = state.user.name === state.currentUser.name;
    },
    setHaveFriends(state){
        state.haveFriends = state.currentUser.friends.length;
    },
    setHaveEvents(state){
        state.haveEvents = state.currentUser.profile_events.length;
    },
    setProfileEvents(state){
        state.profileEvents = [...state.currentUser.profile_events.reverse()];
    },
    setInit(state,bol){
      state.initiated = bol;
    },
    setIsRequested(state,val){
        state.isRequested = val;
    },
    setIsFriended(state,val){
        state.isFriended = val;
    },
    checkIfFriended(state){
        if(!state.isMe){
            for(let prop in state.user.friends){
                if(state.user.friends[prop].name === state.currentUser.name) {
                    state.isFriended = true;
                    return;
                }
            }
            state.isFriended = false;
        }
    },
    checkIfRequested(state){
        if(!state.isMe){
            for(let prop in state.user.requests_of_mine){
                if(state.user.requests_of_mine[prop].name === state.currentUser.name) {
                    state.isRequested = true;
                    return;
                }
            }
            state.isRequested = false;
        }
    },


}
