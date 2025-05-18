import { nanoid } from "nanoid";

export const generateNanoid = (length) => {
    return nanoid(length);
}