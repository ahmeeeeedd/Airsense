import React from "react";
import AlertNotification from "../components/Alerts/Notification";

const Notification = () => {
  return (
    <div className="notification-page">
      <AlertNotification type="success" message="Opération réussie!" />
      <AlertNotification type="error" message="Une erreur s'est produite." />
      <AlertNotification
        type="warning"
        message="Attention, vérifiez vos paramètres!"
      />
      <AlertNotification
        type="fire"
        message="Attention! Probabilité d'incendie détectée."
      />
      <AlertNotification
        type="gas"
        message="Attention! Taux de gaz élevé détecté."
      />
    </div>
  );
};

export default Notification;
