import { getDocuments, addNewDocument, deleteDocument, updateDocument } from '@/Api/documents.js';
import { getStorage, ref, uploadBytes } from "firebase/storage";

export default {
  namespaced: true,
  state () {
    return {
      documents: [],
      originalDocuments: [],
      UploadedFile: null
    }
  },
  mutations: {
    documentsInfo (state, documents) {
      state.documents = documents
    },
    originalDocumentsInfo (state, originalDocuments) {
      state.originalDocuments = originalDocuments
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
      commit('originalDocumentsInfo', res.data);
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

    filterDocumentsData({ state, rootState, commit }, search){
      if (search.searchValue === '') {
          commit('documentsInfo', state.originalDocuments);
      } else {
        const filteredDocuments =  state.originalDocuments.filter(row => {
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
        commit('documentsInfo', filteredDocuments);
      }
    }
  }
}
