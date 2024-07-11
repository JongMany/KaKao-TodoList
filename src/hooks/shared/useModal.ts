import { useState } from "react";

type Props = {
  modalHandler?: (...props: any) => void;
  autoClose?: boolean;
};

export function useModal({ modalHandler, autoClose = true }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    modalHandler?.();
    if (autoClose) {
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    showModal,
    handleOk,
    handleCancel,
  };
}
