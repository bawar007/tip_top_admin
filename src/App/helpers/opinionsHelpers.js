import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

export const handleDeleteOpinion = async (id, HOST) => {
  try {
    await axios.delete(`${HOST}/opinions/${id}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    alert("Dane zostały zaktualizowane");
  }
};

export const handleOpinionUpdate = async (id, textO, starsO, HOST) => {
  try {
    await axios.patch(
      `${HOST}/opinions/${id}`,
      {
        text: textO,
        stars: starsO,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    setTimeout(() => alert("Dane zostały zaktualizowane"), 500);
  } catch (error) {
    console.log(error);
  }
};

export const handleAcceptOpinion = async (data, answerFromAdm, HOST) => {
  try {
    await axios.patch(
      `${HOST}/opinions/${data}`,
      {
        status: "accepted",
        answerFromAdmin: answerFromAdm,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  } finally {
    alert("Opinie zostały zaakceptowane");
  }
};

export const setDate = () => {
  const inputsDate = document.querySelectorAll(".date_form");
  if (!inputsDate) return;

  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  // Dodanie 0 przed miesiącem/dniem, jeśli są jednocyfrowe
  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  // Ustawienie maksymalnej daty w formacie YYYY-MM-DD
  const maxDate = `${year}-${month}-${day}`;
  inputsDate.forEach((item) => item.setAttribute("max", maxDate));
};
