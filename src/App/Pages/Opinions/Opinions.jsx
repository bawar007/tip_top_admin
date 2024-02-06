import { useContext } from "react";

import { AppProviderContext } from "../../Provider/AppProvider";

import useGetOpinions from "../../hooks/useGetOpinions";

import LogoItem from "../../components/LogoItem";
import ListItems from "./Components/ListItems";

const API_KEY = process.env.REACT_APP_API_KEY;

const Opinions = () => {
  const { HOST } = useContext(AppProviderContext);
  const { loading, data, error, setData } = useGetOpinions(HOST, API_KEY);

  if (loading || error) return <LogoItem />;

  const opinionsQue = data.queued.map((item) => (
    <ListItems key={item.id} item={item} setData={setData} data={data} />
  ));

  const opinionsAccepted = data.accepted.map((item) => (
    <ListItems key={item.id} item={item} setData={setData} data={data} />
  ));

  return (
    <div className="opinionssettings-content">
      <ul className="queued_list">
        <h1>Opinie w kolejce</h1>
        {opinionsQue.length !== 0 ? opinionsQue : "Brak wyników"}
      </ul>
      <ul className="queued_list">
        <h1>Opinie zaakceptowane</h1>
        {opinionsAccepted.length !== 0 ? opinionsAccepted : "Brak wyników"}
      </ul>
    </div>
  );
};

export default Opinions;
