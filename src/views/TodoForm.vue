<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h2 class="text-2xl font-bold mb-4">{{ formTitle }}</h2>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label class="block font-bold mb-2" for="title">Title</label>
        <input class="px-4 py-2 border rounded-md w-full" type="text" v-model="form.title" required>
      </div>
      <div class="mb-4">
        <label class="block font-bold mb-2" for="description">Description</label>
        <textarea class="px-4 py-2 border rounded-md w-full" v-model="form.description" required></textarea>
      </div>
      <div class="flex justify-end">
        <button type="submit" class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md">{{ submitButtonLabel }}</button>
      </div>
    </form>
  </div>
</template>

<script>
import { defineComponent, reactive, computed, onMounted } from 'vue'
import todoService from '@/services/todoService'
import { useRoute, useRouter } from 'vue-router'
import { useNotification } from '@kyvg/vue3-notification'

export default defineComponent({
  name: 'TodoForm',
  setup() {

    const form = reactive({
      title: '',
      description: ''
    })

    const route = useRoute()
    const router = useRouter()
    const isEdit = computed(() => route.name === 'EditTodo')
    const todoId = computed(() => route.params.id)
    const notification = useNotification()

    const loadTodo = async () => {
      try {
        const { title, description } = await todoService.get(todoId.value)
        form.title = title
        form.description = description
      } catch (error) {
        notification.notify({
          title: error?.response?.data?.message || 'Failed to load todo',
          type: 'error'
        });
      }
    }

    const createTodo = async () => {
      try {
        await todoService.add(form)
        router.push({name: 'TodoList'})
      } catch (error) {
        notification.notify({
          title: error?.response?.data?.message || 'Failed to add todo',
          type: 'error'
        });
      }
    }

    const updateTodo = async () => {
      try {
        await todoService.update(todoId.value, form)
        router.push({name: 'TodoList'})
      } catch (error) {
        notification.notify({
          title: error?.response?.data?.message || 'Failed to update todo',
          type: 'error'
        });
      }
    }

    const handleSubmit = () => {
      if (isEdit.value) {
        updateTodo()
      } else {
        createTodo()
      }
    }

    onMounted(() => {
      if (isEdit.value) {
        loadTodo()
      }
    })

    const formTitle = computed(() => isEdit.value ? 'Edit Todo' : 'Add Todo')
    const submitButtonLabel = computed(() => isEdit.value ? 'Update Todo' : 'Add Todo')

    return {
      form,
      handleSubmit,
      formTitle,
      submitButtonLabel
    }
  }
})
</script>
