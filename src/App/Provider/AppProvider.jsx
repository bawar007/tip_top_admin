import { createContext, useEffect, useState } from "react";
import { fetchFilesStructure } from "../helpers/fetchFilesStructrureFromApi";

export const AppProviderContext = createContext(null);

const AppProvider = ({ children }) => {
  const HOST = "https://api.tiptopglazura.pl";

  const [settingsFiles, setSettingsFiles] = useState({
    modaIsOpen: false,
    filesToDelete: [],
    optionsFiles: [],
    customNewFolder: "",
    folderToUpload: "",
    filesToUpload: [],
    filesFromApiToView: [],
  });

  const [selectedFilesFromApi, setSelectedFilesFromApi] = useState({
    loading: false,
  });

  useEffect(() => {
    fetchFilesStructure(setSelectedFilesFromApi, setSettingsFiles, HOST);
  }, []);

  return (
    <AppProviderContext.Provider
      value={{
        settingsFiles,
        setSettingsFiles,
        HOST,
        selectedFilesFromApi,
        setSelectedFilesFromApi,
      }}
    >
      {children}
    </AppProviderContext.Provider>
  );
};

export default AppProvider;
