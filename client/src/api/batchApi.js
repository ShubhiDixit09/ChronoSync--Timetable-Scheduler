import axiosClient from './axiosClient';

const BASE = '/batchs';

export const getAllBatchs = () => axiosClient.get(BASE).then((res) => res.data);
export const getBatch = (id) => axiosClient.get(`${BASE}/${id}`).then((res) => res.data);
export const createBatch = (payload) => axiosClient.post(BASE, payload).then((res) => res.data);
export const updateBatch = (id, payload) => axiosClient.put(`${BASE}/${id}`, payload).then((res) => res.data);
export const deleteBatch = (id) => axiosClient.delete(`${BASE}/${id}`).then((res) => res.data);
