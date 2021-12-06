import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { useResetPassword } from '../../hooks/useResetPassword';
import { NAVIGATOR } from '../../utils/constants';

const ForgotPasswordScreen = () => {
  const { mutateAsync: resetPassword, isLoading, isSuccess, isError } = useResetPassword();
  const history = useHistory();
  const {
    handleSubmit,
    formState: { errors: formErrors },
    register,
    control,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    window.alert('To be develop');
    await resetPassword(data);
  };

  useEffect(() => {
    if (isSuccess) {
      history.push(NAVIGATOR.sign_in);
    }
  }, [isSuccess]);

  return (
    <form
      className="flex flex-col flex-1 items-center justify-center h-screen bg-yellow-100"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="mb-10 text-2xl font-bold uppercase">Recuperar Contraseña</h1>

      <div className="flex-col items-start max-w-xs w-full">
        <p className="pb-2">Username</p>
        <input
          id="123"
          name="username"
          disabled={false}
          type="text"
          className="border-black border h-10 p-2 w-full"
          {...register('username', { required: 'Requerido' })}
        />
      </div>

      <div className="flex-col items-center max-w-xs w-full mt-8">
        <button className="border bg-blue-400 rounded min-w-max w-full p-3 my-8">Recuperar Contraseña</button>
      </div>
    </form>
  );
};

export default ForgotPasswordScreen;
