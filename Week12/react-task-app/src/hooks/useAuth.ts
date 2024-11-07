import { useTypedDispatch, useTypedSelector } from "./redux"

export function useAuth() {
    
    const { id, email } = useTypedSelector((state) => state.user);
    return {
        isAuth: !!email,
        email,
        id
    }
}