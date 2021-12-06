import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { useSignIn } from '../../hooks/useSignIn';
import { NAVIGATOR } from '../../utils/constants';

const SignInScreen = () => {
  const { mutateAsync: signIn, isLoading, isSuccess, isError } = useSignIn();
  const history = useHistory();
  const {
    handleSubmit,
    formState: { errors: formErrors },
    register,
    control,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    await signIn(data);
  };

  useEffect(() => {
    if (isSuccess) {
      history.push(NAVIGATOR.main);
    }
  }, [isSuccess]);

  return (
    <form
      className="flex flex-col flex-1 items-center justify-center h-screen bg-yellow-100"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="mb-10 text-2xl font-bold uppercase">Bienvenido a RAEP</h1>

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

      <div className="flex-col items-start max-w-xs w-full mt-8">
        <p className="pb-2">Password</p>
        <input
          id="124"
          name="password"
          disabled={false}
          type="password"
          className="border-black border h-10 p-2 w-full"
          {...register('password', { required: 'Requerido' })}
        />
        <p className="text-right text-xs cursor-pointer" onClick={() => history.push(NAVIGATOR.forgot_password)}>
          Has olvidado la contraseña?
        </p>
      </div>

      <div className="flex-col items-center max-w-xs w-full mt-8">
        <button className="border bg-blue-400 rounded min-w-max w-full p-3 my-8">Ingresar</button>
        <p>
          No tienes una cuenta?
          <span className="ml-2 font-bold cursor-pointer" onClick={() => history.push(NAVIGATOR.student_form)}>
            Crea una.
          </span>
        </p>
      </div>
    </form>
  );
};

export default SignInScreen;
