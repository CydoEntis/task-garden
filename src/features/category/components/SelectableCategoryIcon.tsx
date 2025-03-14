import { Flex } from "@mantine/core";
import { CategoryIcon } from "../shared/category.types";

type SelectedCategoryIcon = {
  categoryIcon: CategoryIcon;
  selectedIcon: CategoryIcon;
  onIconSelect: (categoryIcon: CategoryIcon) => void;
};

function SelectableCategoryIcon({ categoryIcon, selectedIcon, onIconSelect }: SelectedCategoryIcon) {
  return (
    <Flex
      key={categoryIcon.id}
      pos="relative"
      h={35}
      w={35}
      align="center"
      justify="center"
      style={{
        borderRadius: "8px",
        cursor: "pointer",
        border: selectedIcon.id === categoryIcon.id ? "2px solid #66A80F" : "2px solid transparent",
        transition: "all 0.2s ease-in-out",
      }}
      onClick={() => onIconSelect(categoryIcon)}
    >
      {categoryIcon.icon}
    </Flex>
  );
}

export default SelectableCategoryIcon;
