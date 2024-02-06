export const setPassCookie = async (SESION_TOKEN) => {
  // Ustawienie daty wygaśnięcia cookie na 30 dni od teraz
  var expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 30);

  // Utworzenie ciasteczka
  var cookie =
    "SESION_TOKEN=" +
    SESION_TOKEN +
    "; secure expires=" +
    expirationDate.toUTCString() +
    "; Max-Age=2592000";

  // Ustawienie ciasteczka w przeglądarce
  document.cookie = cookie;
};

export const deletePassCookie = () => {
  document.cookie =
    "SESION_TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie =
    "SESION_TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/login;";
};

export const getSesionPasCookie = (name) => {
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieAr = decodedCookie.split(";");

  for (var i = 0; i < cookieAr.length; i++) {
    var cookie = cookieAr[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
};
