import { apiClient } from './client.js';

const ENDPOINT = '/students';

export const studentService = {
  getAll: () => {
    console.log('[Frontend Service] getAll() calling endpoint:', ENDPOINT);
    return apiClient.get(ENDPOINT);
  },
  
  create: (student) => {
    console.log('[Frontend Service] create() sending student:', student);
    return apiClient.post(ENDPOINT, student);
  },

  update: (student) => {
    console.log('[Frontend Service] update() sending student:', student);
    return apiClient.put(`${ENDPOINT}/${student.id}`, student);
  },

  delete: (id) => {
    console.log('[Frontend Service] delete() for id:', id);
    return apiClient.delete(`${ENDPOINT}/${id}`);
  },
};
