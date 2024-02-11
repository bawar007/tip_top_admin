import { useContext, useState } from "react";

import {
  postFilesToServer,
  postMiniatureToServer,
} from "../../../../helpers/requestFunctions";
import UploadBtnWrapper from "./components/UploadBtnWrapper";
import SelectFiles from "./components/SelectFiles";
import { AppProviderContext } from "../../../../Provider/AppProvider";

const SettingsForm = () => {
  const { settingsFiles, setSettingsFiles, HOST } =
    useContext(AppProviderContext);

  const [mini, setMini] = useState(null);

  const handleAddFilesToUpload = (event) => {
    const { name } = event.target;
    if (name === "form__file") {
      const files = Array.from(event.target.files);
      setSettingsFiles((prev) => ({ ...prev, filesToUpload: files }));
    }
  };

  const handleMiniatureFileChange = (event) => {
    const selectedFile = event.target.files;

    const parts = selectedFile[0].name.split(".");
    const partBeforeDot = parts[0];
    const partAfterDot = parts[1];

    setMini({
      file: selectedFile[0],
      name: `${partBeforeDot}_250px.${partAfterDot}`,
    });
  };

  const handleUploadNewFiles = async (e) => {
    e.preventDefault();
    const { filesToUpload, folderToUpload } = settingsFiles;
    if (!folderToUpload) {
      alert("musisz wybrać folder lub dodać nowy");
      return;
    }
    if (filesToUpload && filesToUpload.length > 0 && mini != null) {
      await postFilesToServer(filesToUpload, folderToUpload, HOST);
      await postMiniatureToServer(folderToUpload, mini, HOST);
    } else if (filesToUpload && filesToUpload.length > 0) {
      await postFilesToServer(filesToUpload, folderToUpload, HOST);
    } else if (mini != null) {
      await postMiniatureToServer(folderToUpload, mini, HOST);
    } else {
      alert("Nie wybrałeś plików");
    }

    setTimeout(() => window.location.reload(), 1000);
  };

  return (
    <form onSubmit={handleUploadNewFiles} className="gallerysettings-form">
      <div className="headerForm">
        <h1>Panel Admina</h1>
      </div>

      <div className="newFolderGroup">
        <div className="UploadGroup">
          <UploadBtnWrapper
            text={"Wybierz pliki"}
            cb={handleAddFilesToUpload}
          />
          {settingsFiles.filesToUpload.length > 0 && (
            <div className="file--preview">
              <h3>Wybrane pliki</h3>
              {settingsFiles.filesToUpload.map((item, index) => (
                <img
                  src={URL.createObjectURL(item)}
                  alt={item}
                  width={65}
                  height={65}
                  key={item + index}
                />
              ))}
            </div>
          )}
        </div>
        <div className="UploadGroup">
          <UploadBtnWrapper
            text={"Wybierz miniaturkę"}
            cb={handleMiniatureFileChange}
          />
          {mini && (
            <div className="file--preview">
              <h3>Wybrana miniaturka</h3>
              <img
                src={URL.createObjectURL(mini.file)}
                width={75}
                height={75}
                alt={"mini"}
              />
            </div>
          )}
        </div>

        <SelectFiles />
      </div>
    </form>
  );
};

export default SettingsForm;
