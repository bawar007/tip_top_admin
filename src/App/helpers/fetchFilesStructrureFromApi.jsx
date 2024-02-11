import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

const sortItems = (files) => {
  const filesToSort = files
    .filter((item) => item.table.length !== 0)
    .map((fileName) => {
      return {
        value: fileName.name,
        label: fileName.name,
      };
    });
  const optionsFromFilesSort = [
    { value: "all", label: "all" },
    ...filesToSort,
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

  return { optionsFromFilesSort };
};

export const fetchFilesStructure = async (
  setSelectedFilesFromApi,
  setSettingsFiles,
  HOST
) => {
  setSelectedFilesFromApi((prev) => ({ ...prev, loading: true }));
  await axios
    .get(`${HOST}/files`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Cache-Control": "no-cache",
      },
    })
    .then((response) => {
      const files = response.data;
      const filesWhereFolderHaveImages = files.files.filter(
        (item) => item.table.length !== 0
      );

      const { optionsFromFilesSort } = sortItems(filesWhereFolderHaveImages);
      const settingsOptions = optionsFromFilesSort.filter(
        (item) => item.value !== "all"
      );

      setSelectedFilesFromApi({
        fetchFilesStructure: filesWhereFolderHaveImages,
        filesInView: [filesWhereFolderHaveImages[0]],
        optionsFromFiles: optionsFromFilesSort,
      });

      setSettingsFiles((prev) => ({
        ...prev,
        optionsFiles: settingsOptions,
      }));
    })
    .catch((error) => console.warn(error))
    .finally(() =>
      setSelectedFilesFromApi((prev) => ({ ...prev, loading: false }))
    );
};
