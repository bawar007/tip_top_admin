import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

export const postFilesToServer = async (
  filesToUplaod,
  folderToUpload,
  HOST
) => {
  let formData = new FormData();
  for (let i = 0; i < filesToUplaod.length; i++) {
    formData.append("files", filesToUplaod[i]);
  }

  await axios
    .post(`${HOST}/upload?s=${folderToUpload}`, formData, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    })
    .catch((error) => console.log(error))
    .finally(() => {
      alert("Pliki zostały dodane do serwera");
    });
};

export const postMiniatureToServer = async (folderToUpload, mini, HOST) => {
  let formDataMini = new FormData();
  formDataMini.append("files", mini.file, mini.name);
  await axios
    .post(`${HOST}/uploadmini?s=${folderToUpload}`, formDataMini, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    })
    .catch((error) => console.log(error))
    .finally(() => {
      alert("Miniaturka została dodana");
    });
};
