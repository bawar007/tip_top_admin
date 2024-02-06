import { createContext, useState } from "react";

export const AppProviderContext = createContext(null);

const AppProvider = ({ children }) => {
  const [settingsFiles, setSettingsFiles] = useState({
    settingsMenuIsOpen: false,
    modaIsOpen: false,
    filesToDelete: [],
    optionsFiles: [],
    customNewFolder: "",
    folderToUpload: "",
    filesToUpload: [],
  });

  const HOST = "https://api.tiptopglazura.pl";

  return (
    <AppProviderContext.Provider
      value={{
        settingsFiles,
        setSettingsFiles,
        HOST,
      }}
    >
      {children}
    </AppProviderContext.Provider>
  );
};

export default AppProvider;
