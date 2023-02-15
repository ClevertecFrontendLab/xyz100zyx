/* eslint-disable import/no-extraneous-dependencies */
import axios from "axios";

export const api = axios.create({
    withCredentials: true,
    baseURL: "https://strapi.cleverland.by/api"
})