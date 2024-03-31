import { createStore } from 'vuex';

interface State {
  currentUserId: number;
}

export default createStore<State>({
  state: {
    currentUserId: -1
  },
  mutations: {
    setCurrentUserId(state: State, id: number) {
      state.currentUserId = id;
    }
  },
});