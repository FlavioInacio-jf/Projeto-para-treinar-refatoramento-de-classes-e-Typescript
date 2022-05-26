import { FormHandles } from '@unform/core';
import { FC, useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { FoodType } from '../../types/FoodType';
import Input from '../Input';
import Modal from '../Modal';
import { Form } from './styles';

interface ModalAddFoodProps {
  setIsOpen: () => void;
  handleAddFood: (data: Omit<FoodType, 'id'>) => Promise<void>;
  isOpen: boolean;
}
const ModalAddFood: FC<ModalAddFoodProps> = ({ setIsOpen, handleAddFood, isOpen }) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = async (data: Omit<FoodType, 'id'>) => {
    handleAddFood(data);
    setIsOpen();
  };

  return (
    <Modal isModalOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddFood;
