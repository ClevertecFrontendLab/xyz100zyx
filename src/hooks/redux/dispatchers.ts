import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"

export const useThunkDispatch = () => useDispatch<ThunkDispatch<RootState, any, AnyAction>>()
export const useAppDispatch = () => useDispatch<AppDispatch>()