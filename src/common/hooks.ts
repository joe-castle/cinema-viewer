import { IUser } from "../types/data";
import { useSelector } from "react-redux";
import { IState } from "../types/redux";
import { useState, ChangeEvent } from "react";

/**
 * Fetches user from Redux store
 */
export function useUser(): IUser | null {
  return useSelector<IState, IUser|null>(({ user }) => user && user.name ? user : null)
}

/**
 * Sets up controlled input value in state
 * @param initialValue the initial state value
 */
export function useFormInput <T> (initialValue: T) {
  const [value, setValue] = useState(initialValue)

  function handleChange (e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value as unknown as T)
  }

  return {
    value,
    onChange: handleChange
  }
}