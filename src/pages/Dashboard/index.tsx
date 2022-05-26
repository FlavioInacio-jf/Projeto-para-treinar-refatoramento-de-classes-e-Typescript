import { FC, useEffect, useState } from 'react';
import Food from '../../components/Food';
import Header from '../../components/Header';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import api from '../../services/api';
import { FoodType } from '../../types/FoodType';
import { FoodsContainer } from './styles';

const Dashboard: FC = () => {
  const [foods, setFoods] = useState<FoodType[]>([]);
  const [modalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState({} as FoodType);

  useEffect(() => {
    api.get('/foods').then((response) => setFoods(response.data));
  }, []);

  const handleAddFood = async (food: Omit<FoodType, 'id'>) => {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateFood = async (food: FoodType) => {
    try {
      const foodUpdated = await api.put(`/foods/${editingFood.id}`, { ...editingFood, ...food });

      const foodsUpdated = foods.map((f) => (f.id !== foodUpdated.data.id ? f : foodUpdated.data));

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteFood = async (id: number) => {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter((food) => food.id !== id);

    setFoods(foodsFiltered);
  };

  const toggleModal = () => {
    setIsModalOpen(!modalOpen);
  };

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  const handleEditFood = (food: FoodType) => {
    setEditingFood(food);
    setEditModalOpen(true);
  };

  return (
    <>
      <Header onRequestOpenModal={toggleModal} />
      <ModalAddFood isOpen={modalOpen} setIsOpen={toggleModal} handleAddFood={handleAddFood} />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods.map((food) => (
          <Food
            key={food.id}
            food={food}
            handleDelete={handleDeleteFood}
            handleEditFood={handleEditFood}
          />
        ))}
      </FoodsContainer>
    </>
  );
};

export default Dashboard;
