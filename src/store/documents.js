import { getDocuments, addNewDocument, deleteDocument, updateDocument } from '@/Api/documents.js';
import { getStorage, ref, uploadBytes } from "firebase/storage";

export default {
  namespaced: true,
  state () {
    return {
      documents: [],
      UploadedFile: null
    }
  },
  mutations: {
    documentsInfo (state, documents) {
      state.documents = documents
    },
    fileInfo (state, UploadedFile) {
      state.UploadedFile = UploadedFile
    }
  },
  actions: {
    async getDocuments({ state, rootState, commit }) {
      let res = await getDocuments(rootState.auth.user.accessToken);
      if(!res.status) {
        console.log("faield", res);
        return false;
      }
      commit('documentsInfo', res.data);
    },

    async addDocument({ state, rootState, commit }, documentPayload) {
      let res = await addNewDocument(rootState.auth.user.accessToken, documentPayload);
      if(!res.status) {
        return false;
      }
      commit('documentsInfo', [...res.data, ...state.documents])
      return true;
    },

    async deleteDocument({ state, rootState, commit }, documentPayload) {
      let res = await deleteDocument(rootState.auth.user.accessToken, documentPayload);
      if(!res.status) {
        console.log("faield", res.data);
        return false;
      }
      commit('documentsInfo', res.data);
    },

    async updateDocument({ state, rootState, commit }, documentPayload) {
      let res = await updateDocument(rootState.auth.user.accessToken, documentPayload);
      if(!res.status) {
        console.log("faield", res.data);
        return false;
      }
      commit('documentsInfo', res.data);
      return true;
    },


    async prepareFile({ state, rootState, commit }, file) {
      commit('fileInfo', file);
    },

    
  }
}
