import axiosClient from './axiosClient';

const BASE = '/subjects';

export const getAllSubjects = () => axiosClient.get(BASE).then((res) => res.data);
export const getSubject = (id) => axiosClient.get(`${BASE}/${id}`).then((res) => res.data);
export const createSubject = (payload) => axiosClient.post(BASE, payload).then((res) => res.data);
export const updateSubject = (id, payload) => axiosClient.put(`${BASE}/${id}`, payload).then((res) => res.data);
export const deleteSubject = (id) => axiosClient.delete(`${BASE}/${id}`).then((res) => res.data);
