import { AuthStatus, NameSpace } from '../../const';
import { AppState, UserData } from '../store.types';

export const getAuthStatus = (state: AppState): AuthStatus => state[NameSpace.User].authStatus;
export const getUserData = (state: AppState): UserData | null => state[NameSpace.User].userData;