import Vuex from 'vuex'
import state from "./State";
import actions from "./Actions";
import mutations from "./Mutations";
const Store  = new Vuex.Store({
    state,
    actions,
    mutations,
});
export default Store;
