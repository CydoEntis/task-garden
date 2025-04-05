import { Modal } from "@mantine/core";
import {} from "@mantine/form";
import CreateTaskListForm from "./CreateTasklistForm";

type CreateTaskListModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function CreateTaskListModal({ isOpen, onClose }: CreateTaskListModalProps) {
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      size="lg"
      classNames={{
        body: "modal",
        header: "modal",
      }}
      opened={isOpen}
      onClose={handleClose}
      title="Create a New Task List"
    >
      <CreateTaskListForm onClose={handleClose} categoryName={"test"} />
    </Modal>
  );
}

export default CreateTaskListModal;
