import { useContext, useState } from "react";
import {
  handleDeleteOpinion,
  handleAcceptOpinion,
} from "../../../helpers/opinionsHelpers";

import { AppProviderContext } from "../../../Provider/AppProvider";

const ListItems = ({ item, data, setData }) => {
  const { HOST } = useContext(AppProviderContext);

  const [formValue, setFormValue] = useState({
    text: "",
    status: false,
  });

  const handleAcceptData = async (id) => {
    let updatedItems = data;

    const indexToUpdate = updatedItems.queued.findIndex(
      (item) => item.id === id
    );

    if (indexToUpdate !== -1) {
      updatedItems.queued[indexToUpdate].status = "accepted";
    } else {
      console.error("Element o podanym id nie został znaleziony.");
    }
    // Zwrócenie zaktualizowanej tablicy
    const updatedQue = updatedItems.queued.filter(
      (item) => item.status === "queued"
    );

    setData((prev) => ({
      queued: updatedQue,
      accepted: [...prev.accepted, updatedItems.queued[indexToUpdate]],
    }));
    if (formValue.status) {
      await handleAcceptOpinion(id, formValue.text, HOST);
    } else {
      await handleAcceptOpinion(id, "", HOST);
    }
  };

  const deleteOpinion = async (id) => {
    const deleteQue = data.queued.filter((item) => item.id !== id);
    const deleteAccepted = data.accepted.filter((item) => item.id !== id);

    await handleDeleteOpinion(id, HOST);

    setData({
      accepted: deleteAccepted,
      queued: deleteQue,
    });
  };

  return (
    <li className="queued_list--item">
      <h3>
        IMIE:
        <span>{item.imie}</span>
      </h3>
      <h3>
        EMAIL: <span>{item.email}</span>
      </h3>
      <h3>
        PROJECT: <span>{item.project_id}</span>
      </h3>
      <h3>
        OPINIA: <span>{item.text}</span>
      </h3>
      <h3>
        OCENA: <span>{item.stars}</span>
      </h3>
      <h3>
        DATA PUBLIKACJI: <span>{item.public_data}</span>
      </h3>

      {item.answerFromAdmin && (
        <h3>
          Twoja odpowiedź: <span>{item.answerFromAdmin}</span>
        </h3>
      )}
      {formValue.status && (
        <h3>
          Twoja odpowiedź: <span>{formValue.text}</span>
        </h3>
      )}

      {item.status === "queued" && (
        <div className="Answer">
          <div className="Answer--form">
            {!formValue.status && (
              <textarea
                value={formValue.text}
                onChange={(e) =>
                  setFormValue((prev) => ({ ...prev, text: e.target.value }))
                }
                placeholder="Wpisz swoją odpowiedź..."
              />
            )}
            <p>Co zrobić z odpowiedzią?</p>
            <div>
              <button
                onClick={() => setFormValue((p) => ({ ...p, status: true }))}
              >
                Zaakceptuj
              </button>
              <button onClick={() => setFormValue({ text: "", status: false })}>
                Odrzuć
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="yes_no_group">
        {item.status === "queued" && (
          <img
            src="/icons/yesicon.svg"
            alt="accept_opinion"
            onClick={() => handleAcceptData(item.id)}
            width={40}
            className="yes_icon"
            title="Zaakceptuj opinie"
          />
        )}

        <img
          src="/icons/noicon.svg"
          alt="delete_opinion"
          onClick={() => deleteOpinion(item.id)}
          width={40}
          className="no_icon"
          title="Odrzuć opinie"
        />
      </div>
    </li>
  );
};

export default ListItems;
