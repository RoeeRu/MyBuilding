import { getTopics, addNewTopic, deleteTopic, updateTopic, getThread, addNewResponse, deleteResponse } from '@/Api/forum.js';
import { getStorage, ref, uploadBytes } from "firebase/storage";

export default {
  namespaced: true,
  state () {
    return {
      topics: [],
      originalTopics: [],
      UploadedFile: null,
      thread: {},
      responses_data: [],
    }
  },
  mutations: {
    updateThreadResponses(state, newResponse) {
      state.responses_data = [...state.responses_data, newResponse];
    },
    topicsInfo (state, topics) {
      state.topics = topics
    },
    originalTopicsInfo (state, originalTopics) {
      state.originalTopics = originalTopics
    },
    fileInfo (state, UploadedFile) {
      state.UploadedFile = UploadedFile
    },
    threadInfo (state, thread) {
      state.thread = thread
    },
    responsesInfo (state, responses_data) {
      state.responses_data = responses_data
    }
  },
  actions: {
    async getTopics({ state, rootState, commit }) {
      let res = await getTopics(rootState.auth.user.accessToken);
      if(!res.status) {
        console.log("faield", res);
        return false;
      }
      commit('topicsInfo', res.data);
      commit('originalTopicsInfo', res.data);
    },

    async getThread({ state, rootState, commit }, threadPayload) {
      let res = await getThread(rootState.auth.user.accessToken, threadPayload);
      if(!res.status) {
        return false;
      }
      commit('threadInfo', res.data);
      commit('responsesInfo', res.data.responses);
    },

    async addTopic({ state, rootState, commit }, topicPayload) {
      let res = await addNewTopic(rootState.auth.user.accessToken, topicPayload);
      if(!res.status) {
        console.log("addNewTopic faield", res.data);
        return false;
      }
      commit('topicsInfo', [...res.data, ...state.topics])
      return true;
    },

    async addResponse({ state, rootState, commit }, responsePayload) {
      let res = await addNewResponse(rootState.auth.user.accessToken, responsePayload);
      if(!res.status) {
        console.log("addNewResponse faield", res.data);
        return false;
      }
      commit('updateThreadResponses', res.data);
      return true;
    },

    async deleteTopic({ state, rootState, commit }, topicPayload) {
      let res = await deleteTopic(rootState.auth.user.accessToken, topicPayload);
      if(!res.status) {
        console.log("faield", res.data);
        return false;
      }
      commit('topicsInfo', res.data);
    },

    async updateTopic({ state, rootState, commit }, topicPayload) {
      let res = await updateTopic(rootState.auth.user.accessToken, topicPayload);
      if(!res.status) {
        console.log("faield", res.data);
        return false;
      }
      commit('topicsInfo', res.data);
      return true;
    },

    async deleteResponse({ state, rootState, commit }, responsePayload) {
      let res = await deleteResponse(rootState.auth.user.accessToken, responsePayload);
      if(!res.status) {
        console.log("faield", res.data);
        return false;
      }
      commit('threadInfo', res.data);
      return true;
    },


    async prepareFile({ state, rootState, commit }, file) {
      commit('fileInfo', file);
    },

    filterTopicsData({ state, rootState, commit }, search){
      if (search.searchValue === '') {
          commit('topicsInfo', state.originalTopics);
      } else {
        const filteredTopics =  state.originalTopics.filter(row => {
          // Check if any property of the row contains the search value
          return Object.values(row).some(value => {
                if (typeof value === 'object') {
                    // Check if the object contains the search value
                    const stringifiedValue = JSON.stringify(value)
                    return stringifiedValue.toLowerCase().includes(search.searchValue.toLowerCase())
                } else {
                    return String(value).toLowerCase().includes(search.searchValue.toLowerCase())
                }
          })
        })
        commit('topicsInfo', filteredTopics);
      }
    }
  }
}
