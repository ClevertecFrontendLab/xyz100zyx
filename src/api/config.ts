import axios from "axios";
import { HOST } from "../utils/constants";

export const api = axios.create({
    withCredentials: true,
    baseURL: HOST,
})