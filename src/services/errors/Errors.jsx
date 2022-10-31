export const Error = (error) => {
  const { code } = error;

  const errorCodes = [
    [ 'auth/user-not-found', { message: 'Usuário não encontrado' }],
    [ 'auth/wrong-password', { message: 'Senha incorreta' }],
    [ 'auth/weak-password', { message: 'A senha deve ter pelo menos 6 caracteres!' }],
    [ 'auth/email-already-in-use', { message: 'O email já foi registrado, por favor, selecione outro' }],
    [ 'auth/weak-password', { message: 'A senha deve ter pelo menos 6 caracteres!' }],
  ];

  const errorsMap = new Map(errorCodes);
  const findError = errorsMap.has((error.message));
  if (findError) { return console.log(errorsMap.get(code).message); }
  else { return 'outro erro, descobrir'; }
};