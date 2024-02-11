import { useContext } from "react";
import axios from "axios";
import { AppProviderContext } from "../../../../Provider/AppProvider";

const API_KEY = process.env.REACT_APP_API_KEY;

const Modal = () => {
  const {
    settingsFiles,
    setSettingsFiles,
    HOST,
    setSelectedFilesFromApi,
    selectedFilesFromApi,
  } = useContext(AppProviderContext);

  const handleDeleteFilesTest = async () => {
    try {
      await axios.post(
        `${HOST}/delete`,
        {
          filesToDelete: settingsFiles.filesToDelete,
        },
        {
          headers: { Authorization: `Bearer ${API_KEY}` },
        }
      );
    } catch (error) {
      console.error("Wystąpił błąd podczas usuwania plików:", error);
    }
  };

  const handleDeleteFiles = async () => {
    if (settingsFiles.modalIsOpen) {
      handleDeleteFilesTest();
      const updateFilesStructure =
        selectedFilesFromApi.fetchFilesStructure.reduce((acc, obj1) => {
          let matchingObj2 = settingsFiles.filesToDelete.find(
            (obj2) => obj2.folderName === obj1.name
          );
          if (matchingObj2) {
            obj1.table = obj1.table.filter(
              (element) => !matchingObj2.filesFromFolder.includes(element)
            );
          }
          acc.push(obj1);
          return acc;
        }, []);

      setSettingsFiles((prev) => ({
        ...prev,
        filesToDelete: [],
        modalIsOpen: false,
      }));
      setSelectedFilesFromApi((prev) => ({
        ...prev,
        fetchFilesStructure: updateFilesStructure,
      }));

      alert("Pliki zostały usunięte");
    }
  };

  const handleCancel = () => {
    const inputs = document.querySelectorAll(`input[type="checkbox"]`);
    inputs.forEach((item) => (item.checked = false));

    setSettingsFiles((prev) => ({
      ...prev,
      filesToDelete: [],
      modalIsOpen: false,
    }));
  };

  return (
    <div className="modalCheckedFiles">
      <div className="modalcontent">
        <h2>Czy jesteś pewien, że chcesz usunąć wybrane pliki ?</h2>
        <span
          className="closeBtn"
          onClick={() =>
            setSettingsFiles((prev) => ({ ...prev, modalIsOpen: false }))
          }
        >
          &times;
        </span>
        <div className="filesToDeleteList">
          {settingsFiles.filesToDelete.map((el, index) => (
            <ul key={el.folderName}>
              <h1>{el.folderName}</h1>
              {el.filesFromFolder.map((file) => (
                <li key={file}>{file}</li>
              ))}
            </ul>
          ))}
        </div>
        <div className="btngroup">
          <button
            onClick={() => {
              handleDeleteFiles();
              setSettingsFiles((prev) => ({ ...prev, modalIsOpen: false }));
            }}
            className="acceptBtn"
          >
            Akceptuj
          </button>
          <button onClick={() => handleCancel()} className="deleteBtn">
            Odrzuć
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
