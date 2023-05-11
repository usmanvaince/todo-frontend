import axiosInstance from '@/utils/axiosInstance'

const TodoService = {
    async getAll(page) {
        const response = await axiosInstance.get('/todos', {
            params: {
                page: page
            }
        })
        return response.data
    },

    async add({title, description}) {
        const response = await axiosInstance.post('/todos', { title, description });
        return response.data;
    },

    async get(id) {
        const response = await axiosInstance.get(`/todos/${id}`)
        return response.data
    },

    async update(id, {title, description}) {
        const response = await axiosInstance.patch(`/todos/${id}`, { title, description });
        return response.data;
    },

    async delete(id) {
        await axiosInstance.delete(`/todos/${id}`);
    },
};

export default TodoService;
