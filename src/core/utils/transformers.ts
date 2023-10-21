import { User } from "../../types/interfacesAPI";
import { BASE_URL } from "../constants/baseURL";

const createURL = (resource: string | null) => {
    if (!resource) {
        return null;
    }

    return `${BASE_URL}/resources${resource}`
}

export const transformUserFromApi = (data: User): User => {
    return {
        id: data.id,
        login: data.login,
        first_name: data.first_name,
        second_name: data.second_name,
        display_name: data.display_name,
        avatar: createURL(data.avatar),
        phone: data.phone,
        email: data.email,
    };
};
