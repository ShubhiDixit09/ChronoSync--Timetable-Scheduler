import axiosClient from './axiosClient';

const BASE = '/rooms';

export const getAllRooms = () => axiosClient.get(BASE).then((res) => res.data);
export const getRoom = (id) => axiosClient.get(`${BASE}/${id}`).then((res) => res.data);
export const createRoom = (payload) => axiosClient.post(BASE, payload).then((res) => res.data);
export const updateRoom = (id, payload) => axiosClient.put(`${BASE}/${id}`, payload).then((res) => res.data);
export const deleteRoom = (id) => axiosClient.delete(`${BASE}/${id}`).then((res) => res.data);
