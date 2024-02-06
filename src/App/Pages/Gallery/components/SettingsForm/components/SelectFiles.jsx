import { useContext } from "react";

import Select from "react-select";
import { AppProviderContext } from "../../../../../Provider/AppProvider";

const SelectFiles = () => {
  const { settingsFiles, setSettingsFiles } = useContext(AppProviderContext);

  const handleSelectFolderToUpload = (folder) => {
    setSettingsFiles((prev) => ({
      ...prev,
      folderToUpload: folder,
    }));
  };

  const handleChangeCustomNewFolder = (item) => {
    setSettingsFiles((prev) => ({ ...prev, customNewFolder: item }));
  };

  const handleAddCustomNewFolderToOptions = () => {
    const { customNewFolder, optionsFiles } = settingsFiles;
    if (customNewFolder) {
      const tab = [
        ...optionsFiles,
        { value: customNewFolder, label: customNewFolder },
      ].sort((a, b) => {
        if (typeof a.value === "string" && typeof b.value === "string") {
          const numA = parseInt(a.value.split("_")[1]);
          const numB = parseInt(b.value.split("_")[1]);
          return numA - numB;
        } else if (typeof a.value === "string") {
          return -1;
        } else if (typeof b.value === "string") {
          return 1;
        } else {
          return 0;
        }
      });

      setSettingsFiles((prev) => ({
        ...prev,
        optionsFiles: tab,
        customNewFolder: "",
        folderToUpload: customNewFolder,
      }));
    }
  };

  return (
    <div className="selectFile">
      <div className="selectGroup">
        <h2>Wskarz folder</h2>

        <Select
          value={settingsFiles.optionsFiles.value}
          options={settingsFiles.optionsFiles}
          onChange={(target) => {
            handleSelectFolderToUpload(target.value);
          }}
          className="select-new-files"
          classNamePrefix="new-files"
          placeholder="Zapisz pliki w..."
        />

        <label className="foldername">
          <input
            type="text"
            value={settingsFiles.customNewFolder}
            onChange={(e) => handleChangeCustomNewFolder(e.target.value)}
            className="form__input-text"
          />
          <span
            style={
              settingsFiles.customNewFolder.length > 1
                ? { top: "-20px", fontWeight: 900, fontSize: "smaller" }
                : null
            }
          >
            Nazwa folderu
          </span>
        </label>

        <button
          onClick={(e) => {
            e.preventDefault();
            handleAddCustomNewFolderToOptions();
          }}
          className="form__btn"
        >
          Dodaj nowy folder
        </button>
      </div>
      <div className="buttons_group">
        <button className="form__btn btn_send">
          <span className="btn__text">Upload</span>
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setSettingsFiles((prev) => ({ ...prev, modalIsOpen: true }));
          }}
          className="form__btn"
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Usuń zaznaczone pliki
        </button>
      </div>
    </div>
  );
};

export default SelectFiles;
