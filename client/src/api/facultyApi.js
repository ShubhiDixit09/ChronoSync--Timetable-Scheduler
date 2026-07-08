import axiosClient from './axiosClient';

const BASE = '/facultys';

export const getAllFacultys = () => axiosClient.get(BASE).then((res) => res.data);
export const getFaculty = (id) => axiosClient.get(`${BASE}/${id}`).then((res) => res.data);
export const createFaculty = (payload) => axiosClient.post(BASE, payload).then((res) => res.data);
export const updateFaculty = (id, payload) => axiosClient.put(`${BASE}/${id}`, payload).then((res) => res.data);
export const deleteFaculty = (id) => axiosClient.delete(`${BASE}/${id}`).then((res) => res.data);
