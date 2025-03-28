import { useDisclosure } from "@mantine/hooks";
import UpsertTasklistItem from "../components/UpsertTasklistItem";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import ListItem from "../components/list-item/ListItem";
import UpdateTasklistModal from "../components/UpdateTasklistModal";
import { useTasklistItemHandlers } from "../hooks/useTasklistItemHandlers";
import { Button, Container, Divider, Stack, Title } from "@mantine/core";
import { TasklistDetails } from "../shared/tasks.types";
import { Plus } from "lucide-react";

type TasklistDetailsPageProps = {
  tasklist: TasklistDetails;
};

function TasklistDetailsPage({ tasklist }: TasklistDetailsPageProps) {
  const {
    TasklistItems: tasklistItems,
    createItem,
    updateItem,
    deleteItem,
    reorderItems,
    toggleItemStatus,
    showCreateItem,
    showUpdateItem,
    closeItem,
    editingState: { itemToUpdate, isCreating },
  } = useTasklistItemHandlers(tasklist.tasklistItems);
  const [isModalOpen, { open: openModal, close: closeModal }] = useDisclosure(false);

  return (
    
    <Container pos="relative" mih="90vh" >
      <Title>{tasklist.name}</Title>
      <Divider my={16} size="md" color={tasklist.categoryColor} />
      <Button pos="absolute" bottom={0} right={0} onClick={openModal} leftSection={<Plus size={20} />} variant="subtle" color="gray">
        New Item
      </Button>
      <DragDropContext onDragEnd={reorderItems}>
        <Droppable droppableId="task-list" direction="vertical">
          {(provided) => (
            <Stack {...provided.droppableProps} ref={provided.innerRef} gap={16}>
              {tasklist.tasklistItems.map((item, index) => (
                <Draggable key={index} draggableId={String(item.id)} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={{
                        ...provided.draggableProps.style,
                      }}
                    >
                      <div {...provided.dragHandleProps} onDoubleClick={() => showUpdateItem(item)}>
                        {itemToUpdate?.id === item.id ? (
                          <UpsertTasklistItem
                            isActive={true}
                            TasklistId={tasklist.id}
                            TasklistItem={item}
                            onClose={closeItem}
                            onUpdate={updateItem}
                          />
                        ) : (
                          <ListItem item={item} onDelete={deleteItem} onChange={toggleItemStatus} />
                        )}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Stack>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
    // <>
    //   <UpdateTasklistModal onClose={closeModal} isOpen={isModalOpen} Tasklist={Tasklist} />
    //   <Paper bg="secondary" p={16} radius="md" mt={16} withBorder>
    //     <TasklistDetails
    //       Tasklist={Tasklist}
    //       onUpdate={function (): void {
    //         throw new Error("Function not implemented.");
    //       }}
    //       onDelete={function (): void {
    //         throw new Error("Function not implemented.");
    //       }}
    //     />

    //     {/* Show Create Task Input (Only if nothing is being edited) */}
    //     {/* {isCreating && !itemToUpdate && (
    //       <UpsertTasklistItem
    //         onCreate={createTasklistItemHandler}
    //         TasklistId={TasklistDetails.id}
    //         isActive={isCreating}
    //         onClose={closeCreateTasklistItemHandler}
    //       />
    //     )} */}

    //     {/* Render Task Items */}

    //   </Paper>
    // </>
  );
}

export default TasklistDetailsPage;
