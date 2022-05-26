import { FC, useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { FoodType } from '../../types/FoodType';
import Input from '../Input';
import Modal from '../Modal';
import { Form } from './styles';

interface ModalEditFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  editingFood: FoodType;
  handleUpdateFood: (data: FoodType) => Promise<void>;
}
const ModalEditFood: FC<ModalEditFoodProps> = ({
  isOpen,
  setIsOpen,
  editingFood,
  handleUpdateFood
}) => {
  const formRef = useRef(null);

  const handleSubmit = async (data: FoodType) => {
    handleUpdateFood(data);
    setIsOpen();
  };

  return (
    <Modal isModalOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditFood;
