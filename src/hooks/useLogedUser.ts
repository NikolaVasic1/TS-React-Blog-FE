import { useState } from "react";
import { User } from "../common/User";

const useLogedUser = () => {
    const getUser = () => {
        const userString = sessionStorage.getItem('user')!;
        const logedUser = JSON.parse(userString);
        return logedUser;
    }

    const [user, setUser] = useState(getUser());

    const saveUser = (loggedUser: User) => {
        sessionStorage.setItem('user', JSON.stringify(loggedUser));
        setUser(loggedUser);
    }

    return {
        user,
        setUser: saveUser
    }

}

export default useLogedUser;