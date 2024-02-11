import { useContext, useState } from "react";
import ImagesGroupContent from "./ImagesGroupContent";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import { AppProviderContext } from "../../../../Provider/AppProvider";
import LogoItem from "../../../../components/LogoItem";

const ImagesGroup = () => {
  const animatedComponents = makeAnimated();

  const { loading, selectedFilesFromApi, setSelectedFilesFromApi } =
    useContext(AppProviderContext);

  const [allSelectItems, setAllSelectItems] = useState(false);

  if (loading) return <LogoItem />;

  const handleFilesInView = (itemsToView) => {
    const { fetchFilesStructure } = selectedFilesFromApi;
    const ALL_FILES = itemsToView.findIndex((item) => item.value === "all");

    const filesInView = itemsToView.map((file) => file.value);

    const TableSelectedFolders = [];
    if (ALL_FILES !== -1) {
      fetchFilesStructure.forEach((item) => TableSelectedFolders.push(item));
      setAllSelectItems(true);
    } else {
      filesInView.forEach((file) => {
        fetchFilesStructure.filter(
          (e) => e.name === file && TableSelectedFolders.push(e)
        );
      });
      setAllSelectItems(false);
    }

    setSelectedFilesFromApi((prev) => ({
      ...prev,
      filesInView: TableSelectedFolders,
    }));
  };

  const { optionsFromFiles = { value: "", label: "" }, filesInView } =
    selectedFilesFromApi;

  return (
    <div className="gallerysettings-counter">
      <div className="counter-settings">
        <div className="settings-folders">
          <h3>FOLDERY:</h3>
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            value={
              allSelectItems
                ? { value: "all", label: "all" }
                : optionsFromFiles.value
            }
            options={optionsFromFiles}
            className="select-form-files"
            classNamePrefix="form-files"
            onChange={(value) => handleFilesInView(value)}
            placeholder={"Wybierz foldery"}
            defaultValue={optionsFromFiles[1]}
          />
        </div>
      </div>

      <ImagesGroupContent imageMap={filesInView} />
    </div>
  );
};

export default ImagesGroup;
