export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'https://api.memfeed.app';

// Pré-autenticação: o app assume um aluno até o login existir.
export const STUDENT_ID =
  process.env.EXPO_PUBLIC_STUDENT_ID ?? '11111111-1111-4111-8111-111111111111'
