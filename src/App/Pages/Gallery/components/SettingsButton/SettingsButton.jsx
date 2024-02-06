import { useContext } from "react";

import { AppProviderContext } from "../../../../Provider/AppProvider";

const SettingsButton = () => {
  const { setSettingsFiles } = useContext(AppProviderContext);
  return (
    <div className="settings_btn">
      <img
        src="/icons/settings_gallery.svg"
        alt="sett"
        width="70"
        height="70"
      />

      <img
        src="/icons/settings_file.svg"
        alt="sett2"
        width="40"
        height="40"
        onClick={() =>
          setSettingsFiles((prev) => ({ ...prev, settingsMenuIsOpen: true }))
        }
      />
      <img
        src="/icons/refresh.svg"
        alt="refresh"
        width="50"
        height="50"
        onClick={() => window.location.reload()}
      />
    </div>
  );
};

export default SettingsButton;
