import { useContext, useRef } from "react";

import { AppProviderContext } from "../../../../Provider/AppProvider";

const ImagesGroupContent = ({ imageMap }) => {
  const { settingsFiles, setSettingsFiles, HOST } =
    useContext(AppProviderContext);

  const previevRef = useRef(null);
  const imgRef = useRef(null);

  const handleCheckFoldersAndAddFilesToThis = (folderName, fileName) => {
    const filesToDeleteFromFolder = settingsFiles.filesToDelete.filter(
      (folder) => folder.folderName === folderName
    );

    if (filesToDeleteFromFolder.length === 0) {
      setSettingsFiles((prev) => ({
        ...prev,
        filesToDelete: [
          ...prev.filesToDelete,
          {
            folderName,
            filesFromFolder: [fileName],
          },
        ],
      }));
    } else {
      setSettingsFiles((prev) => ({
        ...prev,
        filesToDelete: prev.filesToDelete.map((folder) =>
          folder.folderName === folderName
            ? {
                ...folder,
                filesFromFolder: [...folder.filesFromFolder, fileName],
              }
            : folder
        ),
      }));
    }
  };

  const handleUnCheckFoldersAndFilesFromThis = (folderName, fileName) => {
    setSettingsFiles((prev) => {
      const updatedFiles = prev.filesToDelete.map((folder) =>
        folder.folderName === folderName
          ? {
              ...folder,
              filesFromFolder: folder.filesFromFolder.filter(
                (item) => item !== fileName
              ),
            }
          : folder
      );

      const updatedFilesToDelete = updatedFiles.filter(
        (folder) => folder.filesFromFolder.length > 0
      );

      return {
        ...prev,
        filesToDelete: updatedFilesToDelete,
      };
    });
  };

  const handleChangeChecbox = (e) => {
    if (e.target.checked === false) {
      handleUnCheckFoldersAndFilesFromThis(e.target.name, e.target.id);
    } else if (e.target.checked === true) {
      handleCheckFoldersAndAddFilesToThis(e.target.name, e.target.id);
    }
  };

  const handleCheckBoxFromIcon = (name, id) => {
    const inputs = document.querySelectorAll(
      `input[name="${name}"][id="${id}"]`
    );

    inputs.forEach((el) => {
      if (el.checked) {
        el.checked = false;
        handleUnCheckFoldersAndFilesFromThis(name, id);
      } else if (el.checked === false) {
        el.checked = true;
        handleCheckFoldersAndAddFilesToThis(name, el.id);
      }
    });
  };

  const checkAllImagesFromGroup = (name) => {
    const images = document.querySelectorAll(`input[name="${name}"]`);

    const newArr = [];

    images.forEach((el) => {
      if (!el.checked) {
        el.checked = true;
        newArr.push(el.id);
      }
    });

    setSettingsFiles((prev) => ({
      ...prev,
      filesToDelete: [
        ...prev.filesToDelete,
        {
          folderName: name,
          filesFromFolder: newArr,
        },
      ],
    }));
  };

  const uncheckAllImagesFromGroup = (name) => {
    const images = document.querySelectorAll(`input[name="${name}"]`);
    setSettingsFiles((prev) => ({
      ...prev,
      filesToDelete: prev.filesToDelete.filter(
        (item) => item.folderName !== name
      ),
    }));

    images.forEach((el) => (el.checked = false));
  };

  const imageGroups =
    imageMap.length !== 0
      ? imageMap.map((item) => {
          if (item && item.table.length > 0) {
            return (
              <div
                key={item.name}
                className="gallerysettings-counter-images"
                style={imageMap.length === 1 ? { maxWidth: "100%" } : null}
              >
                <h2>{item.name}</h2>

                <div className="butttonsImageGroup">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      checkAllImagesFromGroup(item.name);
                    }}
                    className="ImageGroup--btn"
                  >
                    zaznacz
                  </button>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      uncheckAllImagesFromGroup(item.name);
                    }}
                    className="ImageGroup--btn"
                  >
                    odznacz
                  </button>
                </div>

                {item.table.map((imageName) => (
                  <div className="image_checkbox__group" key={imageName}>
                    <img
                      loading="lazy"
                      src={`${HOST}/images/${item.name}/${imageName}`}
                      alt={imageName}
                      className="counter__image"
                      onClick={() =>
                        handleCheckBoxFromIcon(item.name, imageName)
                      }
                      style={
                        imageMap.length === 1
                          ? { width: "120px", height: "120px" }
                          : null
                      }
                    />
                    <input
                      type="checkbox"
                      name={item.name}
                      id={imageName}
                      onChange={handleChangeChecbox}
                    />
                  </div>
                ))}
              </div>
            );
          } else return null;
        })
      : null;

  return (
    <div className="test_counter-content">
      {imageGroups}
      <div className="previev" ref={previevRef}>
        <img src="" alt="preview" width={150} height={150} ref={imgRef} />
      </div>
    </div>
  );
};

export default ImagesGroupContent;
