import { useContext, useState } from "react";
import ImagesGroupContent from "./ImagesGroupContent";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import { AppProviderContext } from "../../../../Provider/AppProvider";
import useImages from "../../hooks/useImages";
import LogoItem from "../../../../components/LogoItem";

const ImagesGroup = () => {
  const animatedComponents = makeAnimated();

  const { HOST } = useContext(AppProviderContext);

  const { loading, selectedFilesFromApi, error, setSelectedFilesFromApi } =
    useImages(HOST);

  const [allSelectItems, setAllSelectItems] = useState(false);

  if (loading || error) return <LogoItem />;

  const handleFilesInView = (itemsToView) => {
    const test = itemsToView.findIndex((item) => item.value === "all");

    const filesInView = itemsToView.map((file) => file.value);

    const TableSelectedFolders = [];
    if (test !== -1) {
      selectedFilesFromApi.fetchFilesStructure.forEach((item) =>
        TableSelectedFolders.push(item)
      );
      setAllSelectItems(true);
    } else {
      filesInView.forEach((file) => {
        selectedFilesFromApi.fetchFilesStructure.filter(
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
                : selectedFilesFromApi.optionsFromFiles.value
            }
            options={selectedFilesFromApi.optionsFromFiles}
            className="select-form-files"
            classNamePrefix="form-files"
            onChange={(value) => handleFilesInView(value)}
            placeholder={"Wybierz foldery"}
            defaultValue={selectedFilesFromApi.optionsFromFiles[1]}
          />
        </div>
      </div>

      <ImagesGroupContent imageMap={selectedFilesFromApi.filesInView} />
    </div>
  );
};

export default ImagesGroup;
