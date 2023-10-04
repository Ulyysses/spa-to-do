import {
    TypedUseSelectorHook,
    useSelector as selectorHook,
  } from 'react-redux';
  import { RootState } from './store';

export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook; 
// export const useAppDispatch: () => AppDispatch = useDispatch