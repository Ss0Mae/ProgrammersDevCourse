import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/index";
import { TypedUseSelectorHook } from "react-redux";

const useTypedSelector : TypedUseSelectorHook<RootState> = useSelector
const useTypedDispatch = () => useDispatch<AppDispatch>();

const logger = useSelector((state:RootState) => state.logger);
