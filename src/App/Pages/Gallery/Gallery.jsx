import { useContext } from "react";
import { AppProviderContext } from "../../Provider/AppProvider";
import SettingsForm from "./components/SettingsForm/SettingsForm";
import SettingsButton from "./components/SettingsButton/SettingsButton";
import Modal from "./components/Modal/Modal";
import ImagesGroup from "./components/ImagesGroup/ImagesGroup";

const Gallery = () => {
  const { settingsFiles } = useContext(AppProviderContext);
  return (
    <div className="Gallerysettings">
      {settingsFiles.settingsMenuIsOpen ? <SettingsForm /> : <SettingsButton />}
      <ImagesGroup />
      {settingsFiles.modalIsOpen && <Modal />}
    </div>
  );
};

export default Gallery;
