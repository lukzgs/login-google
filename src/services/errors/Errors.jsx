import toast from 'react-hot-toast';

export const HandleError = (error) => {
  console.log(error);

  toast.error(error);
  const errorCodes = [
    [ 'auth/user-not-found', { message: 'Usuário não encontrado' }],
    [ 'auth/wrong-password', { message: 'Senha incorreta' }],
    [ 'auth/weak-password', { message: 'A senha deve ter pelo menos 6 caracteres!' }],
    [ 'auth/email-already-in-use', { message: 'O email já foi registrado, por favor, selecione outro' }],
    [ 'auth/weak-password', { message: 'A senha deve ter pelo menos 6 caracteres!' }],
  ];

  const errorsMap = new Map(errorCodes);
  console.log(errorsMap);
  const findError = errorsMap.has((error));
  console.log(findError);
  // if (findError) { return console.log(errorsMap.get(error).message); }
  // else { return 'outro erro, descobrir'; }

  return toast.error(error);
};