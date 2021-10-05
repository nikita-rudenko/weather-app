import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

/**
 * `useDispatch` typed with our store
 */
export const useStoreDispatch = () => useDispatch<AppDispatch>();

/**
 * `useSelector` typed with our store
 */
export const useStoreSelector: TypedUseSelectorHook<RootState> = useSelector;
