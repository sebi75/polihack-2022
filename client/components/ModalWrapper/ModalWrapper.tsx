import { Modal } from "react-native";
import { FunctionComponent, ReactNode, Dispatch, SetStateAction } from "react";

interface ICustomModalProps {
  children: ReactNode;
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}

export const ModalWrapper: FunctionComponent<ICustomModalProps> = ({
  children,
  setModalVisible,
  modalVisible = false,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      {children}
    </Modal>
  );
};
