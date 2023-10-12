import { useState } from "react";

export const useModalFunctions = () => {
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [questionModalVisible, setQuestionModalVisible] = useState(false);

  const showErrorAlert = () => {
    setErrorModalVisible(true);
  };

  const showInfoAlert = () => {
    setInfoModalVisible(true);
  };

  const showSuccessAlert = () => {
    setSuccessModalVisible(true);
  };

  const showQuestionAlert = () => {
    setQuestionModalVisible(true);
  };

  const closeErrorAlert = () => {
    setErrorModalVisible(false);
  };

  const closeInfoAlert = () => {
    setInfoModalVisible(false);
  };

  const closeSuccessAlert = () => {
    setSuccessModalVisible(false);
  };

  const closeQuestionAlert = () => {
    setQuestionModalVisible(false);
  };

  return {
    errorModalVisible,
    infoModalVisible,
    successModalVisible,
    questionModalVisible,
    showErrorAlert,
    showInfoAlert,
    showSuccessAlert,
    showQuestionAlert,
    closeErrorAlert,
    closeInfoAlert,
    closeSuccessAlert,
    closeQuestionAlert,
  };
};