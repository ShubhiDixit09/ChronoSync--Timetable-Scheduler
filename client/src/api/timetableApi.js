import axiosClient from './axiosClient';

export const generateTimetable = (payload) =>
  axiosClient.post('/timetable/generate', payload).then((res) => res.data);

export const getGenerationStatus = (jobId) =>
  axiosClient.get(`/timetable/${jobId}/status`).then((res) => res.data);

export const getCandidates = (jobId) =>
  axiosClient.get(`/timetable/${jobId}/candidates`).then((res) => res.data);

export const approveTimetable = (id) =>
  axiosClient.post(`/timetable/${id}/approve`).then((res) => res.data);

export const getPublishedTimetable = (batchId) =>
  axiosClient.get('/timetable/published', { params: { batch: batchId } }).then((res) => res.data);
