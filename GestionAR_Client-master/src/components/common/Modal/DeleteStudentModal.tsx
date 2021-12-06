type Props = {
  student: any;
  closeModal: () => void;
};

export const DeleteStudentModal = ({ student, closeModal }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <p>
        ¿Estas seguro que desa borrar al Estudiante "{student.firstName} {student.lastName}"?
      </p>
      <button className="border hover:bg-opacity-40 bg-green-400 rounded min-w-max w-full p-3 my-2">Confirmar</button>
      <button className="border hover:bg-opacity-40 bg-red-400 rounded min-w-max w-full p-3 my-2" onClick={closeModal}>
        Cancelar
      </button>
    </div>
  );
};
