import { store as globalStore } from '../store';
import { login } from '@/entities/session';
import _ from 'lodash';

export default (store: typeof globalStore) => {
  if (!store) return;

  const user = localStorage.getItem('user') ?? '';
  const token = localStorage?.getItem('token') ?? '';

  if (!user || !token) return;

  store.dispatch(login({ email: user, authToken: token }));
};
