import React, { useState } from "react";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimesCircle,
  FaTimes,
  FaFire,
  FaGasPump,
} from "react-icons/fa";
import "./AlertNotification.css";

const AlertNotification = ({ type = "info", message, dismissible = true }) => {
  const [visible, setVisible] = useState(true);

  let bgColor, textColor, icon;

  switch (type) {
    case "success":
      bgColor = "#C9ADA7";
      textColor = "#284C78";
      icon = <FaCheckCircle />;
      break;
    case "error":
      bgColor = "#9B8C99";
      textColor = "#C9ADA7";
      icon = <FaTimesCircle />;
      break;
    case "warning":
      bgColor = "#FFFFF";
      textColor = "#284C78";
      icon = <FaExclamationCircle />;
      break;
    case "fire":
      bgColor = "#FF6F61";
      textColor = "#FFFFFF";
      icon = <FaFire />;
      message =
        message ||
        "Attention! Probabilité d'incendie détectée. Veuillez rester vigilant.";
      break;
    case "fire_high":
      bgColor = "#f07167";
      textColor = "#FFFFFF";
      icon = <FaFire />;
      message =
        message ||
        "Attention! Un autre type d'incendie détecté. Soyez prudent et suivez les consignes de sécurité.";
      break;
    case "gas":
      bgColor = "#e9c46a";
      textColor = "#000000";
      icon = <FaGasPump />;
      message =
        message ||
        "Attention! Taux de gaz élevé détecté. Une machine pourrait être endommagée.";
      break;
    case "gas_high":
      bgColor = "#FFA500";
      textColor = "#000000";
      icon = <FaGasPump />;
      message =
        message ||
        "Attention! Niveau de gaz extrêmement élevé. Le danger d'endommagement des machines est critique.";
      break;
    case "info":
    default:
      bgColor = "#9B8C99";
      textColor = "#C9ADA7";
      icon = <FaInfoCircle />;
      break;
  }

  const handleClose = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className={`alert-notification animate-slide-in flex items-center justify-between p-4 mb-4 rounded-lg shadow-lg relative`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="flex items-center space-x-2">
        <div className="text-2xl">{icon}</div>
        <span className="text-lg">{message}</span>
      </div>
      {dismissible && (
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-lg hover:text-red-500 transition duration-300"
        >
          <FaTimes />
        </button>
      )}
    </div>
  );
};

export default AlertNotification;
