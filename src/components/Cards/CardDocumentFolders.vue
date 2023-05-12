<template>
  <div class="file-manager">

    <div v-if="error" class="error">{{ error }}</div>
    <div v-else>
			<button style="display:inline; float:left; margin-right:20px;" @click="createNewFolder" class="btn create-folder-btn ">Create new folder</button>

      <div class="upload">
        <a-upload
          :custom-request="customRequestUpload"
          :v-model="fileName"
          :show-upload-list="true"
        >
          <a-button class="create-folder-btn">Click to Upload</a-button>
        </a-upload>
      </div>


      <div v-if="showCreateFolderModal" class="create-folder-modal">
        <div class="new-folder-container">
          <label for="new-folder-name">Folder name:</label>
          <input type="text" id="new-folder-name" v-model="newFolderName">
        </div>
        <div>
          <button @click="createFolder" class="btn create-btn formButton">Create</button>
          <button @click="cancelCreateFolder" class="btn cancel-btn formButton">Cancel</button>
        </div>
      </div>

      <div v-if="currentFolder">
        <h2 class="folder-title">Folder: {{ currentFolder.name }}</h2>
        <button @click="goToParentFolder" class="btn create-folder-btn">Go to parent folder</button>

        <ul class="folders">
          <li v-for="folder in currentFolder.folders" :key="folder.id">
            <button @click="goToFolder(folder.id)" class="btn folder-btn formButton">{{ folder.name }}</button>
          </li>
        </ul>

        <table v-if="currentFolder.files.length > 0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Download</th>
							<th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="file in currentFolder.files" :key="file.id"  >
              <td v-if="file.name!=='internal'" class="file-name">{{ file.name }}</td>
              <td v-if="file.name!=='internal'"><a :href="file.url" download class="btn download-btn">Download</a></td>
							<td v-if="file.name!=='internal'">
							        <a-button type="danger" @click="deleteFile(file.id)">Delete</a-button>
							</td>
						</tr>
          </tbody>
        </table>



      </div>
      <div v-else>
        <h2 class="title">Root folder</h2>
        <ul v-if="!showCreateFolderModal" class="folders">
          <li v-for="folder in rootFolders" :key="folder.id">
            <button @click="goToFolder(folder.id)" class="btn folder-btn">{{ folder.name }}</button>
          </li>
        </ul>

      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, listAll, uploadBytes, deleteObject  } from "firebase/storage";

export default {
		  data() {
		    return {
					error: null,
		      currentFolderId: null,
		      currentFolder: null,
		      rootFolders: [],
		      storageRef: null,
					storage: null,
					fileName: null,
					showCreateFolderModal: false,
					newFolderName: '',
		    };
		  },
		  async mounted() {
		    try {
					this.storage = getStorage();
					this.storageRef = ref(this.storage, '155-west-68th-st-NYC-NY');
		      const rootSnapshot = await listAll(this.storageRef);
					this.rootFolders = rootSnapshot.prefixes.map((folderRef) => ({
					id: folderRef.fullPath,
					name: folderRef.name,
				}));
		    } catch (error) {
		      this.error = error.message;
		    }
		  },
		  methods: {
				async goToFolder(folderId) {
		      try {
						this.storageRef = ref(this.storage, folderId);
		        const folderSnapshot = await listAll(this.storageRef);
						console.log("folderSnapshot", folderSnapshot);

		        const folder = {
		          id: folderId,
		          name: folderId.split('/').pop(),
		          folders: folderSnapshot.prefixes.map((folderRef) => ({
		            id: folderRef.fullPath,
		            name: folderRef.name,
		          })),
		          files: folderSnapshot.items.map((itemRef) => ({
		            id: itemRef.fullPath,
		            name: itemRef.name,
		            size: itemRef.size,
		            url: null, // we'll fetch this later
		          })),
		        };
		        await Promise.all(folder.files.map(async (file) => {
							this.storageRef = ref(this.storage, file.id);
		          file.url = await getDownloadURL(this.storageRef);
		        }));

		        this.currentFolderId = folderId;
		        this.currentFolder = folder;

		      } catch (error) {
		        this.error = error.message;
		      }
		    },


				async goToParentFolder() {
		      const parts = this.currentFolderId.split('/');
		      parts.pop(); // remove the current folder's name
		      const parentFolderId = parts.join('/');
		      await this.goToFolder(parentFolderId);
		    },

		  //   async uploadFile(event) {
		  //     const file = event.target.files[0];
		  //     if (!file) return;
		  //     const uploadTask = this.storageRef.child(`${this.currentFolderId}/${file.name}`).put(file);
		  //     await new Promise((resolve, reject) => {
		  //       uploadTask.on('state_changed', null, reject, resolve);
		  //     });
		  //     await this.goToFolder(this.currentFolderId); // refresh the current folder
			// }

			async customRequestUpload(options) {
				//custom upload function to handle the upload request and response
				//uploading the file to firebase storage


				// Create the file metadata
				/** @type {any} */
				const metadata = {
					contentType: options.file.type,
				};

				// Upload file and metadata to the object 'images/mountains.jpg'
				const location = this.currentFolderId + '/' + options.file.name;
				const storageRef = ref(this.storage, location);
				const uploadTask = uploadBytesResumable(storageRef, options.file, metadata);

				// Listen for state changes, errors, and completion of the upload.
				uploadTask.on('state_changed',
					(snapshot) => {
						// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
						const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
						console.log('Upload is ' + progress + '% done');
						switch (snapshot.state) {
							case 'paused':
								console.log('Upload is paused');
								break;
							case 'running':
								console.log('Upload is running');
								break;
						}
						console.log("snapshot.state", snapshot.state);
					},
					(error) => {
						// A full list of error codes is available at
						// https://firebase.google.com/docs/storage/web/handle-errors
						switch (error.code) {
							case 'storage/unauthorized':
								// User doesn't have permission to access the object
								break;
							case 'storage/canceled':
								// User canceled the upload
								break;

							case 'storage/unknown':
								// Unknown error occurred, inspect error.serverResponse
								break;
						}
					},
	        async () => {
						console.log("goToFolder");
						return await this.goToFolder(this.currentFolderId); // refresh the current folder
	        }
				);
			},

		async createNewFolder() {
			this.showCreateFolderModal = true;
		},
		async createFolder() {
			if (!this.newFolderName) {
				return;
			}

			const newFolderId = this.currentFolderId + '/'  + this.newFolderName + '/'  + 'internal';
			const storageRef = ref(this.storage, newFolderId);


			uploadBytes(storageRef, new Blob(['internal'])).then(async (snapshot) => {
				await this.goToFolder(this.currentFolderId);
				this.showCreateFolderModal = false;
			});

		},
		async cancelCreateFolder() {
			this.showCreateFolderModal = false;
			this.newFolderName = '';
		},

		async deleteFile(filtePath) {
			// Create a reference to the file to delete
	    const desertRef = ref(this.storage, filtePath);
			// Delete the file
			deleteObject(desertRef).then(async () => {
			  return await this.goToFolder(this.currentFolderId);
			}).catch((error) => {
			  console.log("Uh-oh, an error occurred!");
			});
		}
	}
}
</script>


<style>

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
}

.folder-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
}

.file-manager {
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #333;
}

h1 {
  font-size: 30px;
  margin-bottom: 20px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

ul li {
  display: inline-block;
  margin-right: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

table th,
table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

table th {
  background-color: #f2f2f2;
}

 button {
  padding: 10px;
  background-color: #008CBA;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 16px;
}


button.create-folder-btn{
	margin-bottom: 20px;
}

button:hover {
  background-color: #006CBA;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  max-width: 500px;
}

.modal-content label {
  display: block;
  margin-bottom: 10px;
}

.modal-content input[type="text"] {
  padding: 10px;
  font-size: 16px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
}

.modal-content button {
  padding: 10px;
  background-color: #008CBA;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px;
}

.modal-content button:last-of-type {
  margin-right: 0;
  background-color: #ccc;
}

.modal-content button:hover {
  background-color: #006CBA;
}

.modal-content button:last-of-type:hover {
  background-color: #999;
}

.new-folder-container {
	display: flex;
	flex-direction: column;
	margin-top: 10px;
}
.new-folder-container label {
	font-weight: bold;
	margin-bottom: 5px;
}
.new-folder-container input[type="text"] {
	padding: 5px;
	border-radius: 3px;
	border: 1px solid #ccc;
}

@media screen and (max-width: 767px) {
  table {
    display: block;
    overflow-x: auto;
  }

  table th,
  table td {
    min-width: 150px;
  }
}

</style>
