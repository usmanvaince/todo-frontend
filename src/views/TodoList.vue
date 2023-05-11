<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex justify-between mb-10">
      <h1 class="text-3xl font-bold">Todo List</h1>
      <div class="flex justify-center items-center">
        <router-link to="/todos/new" class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md">
          Add Todo
        </router-link>
      </div>
    </div>


    <div class="relative mb-8">
      <input
          v-model="searchQuery"
          type="text"
          placeholder="Search..."
          class="py-2 pl-4 pr-10 w-full rounded-full bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
          class="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          @click="searchQuery = ''"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
          <path
              fill-rule="evenodd"
              d="M13.563 12.174l4.533 4.533a1 1 0 01-1.414 1.414l-4.533-4.533a7 7 0 111.414-1.414zM7 12a5 5 0 100-10 5 5 0 000 10z"
              clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
    <ul class="divide-y divide-gray-200">
      <li v-for="todo in filteredTodos" :key="todo.id" class="py-4">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <h2 class="text-lg font-bold text-gray-800">{{ todo.title }}</h2>
            <p class="text-gray-500">{{ todo.description }}</p>
          </div>
          <div class="flex items-center space-x-4">
            <button
                class="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                @click="edit(todo)"
            >
              Edit
            </button>
            <button
                class="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                @click="remove(todo)"
            >
              Delete
            </button>
          </div>
        </div>
      </li>
    </ul>
    <div class="flex justify-center items-center">
       <infinite-loading @infinite="loadTodos" />
    </div>

  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import todoService from '@/services/todoService'

export default defineComponent({
  name: 'TodoList',
  setup() {
    const todos = ref([])
    const searchQuery = ref('')
    const router = useRouter()
    let page = 1

    const loadTodos = async ($state = { loaded() {}, complete() {} }) => {
      try {
        const { data }  = await todoService.getAll(page)
        todos.value.push(...data);
        if (data.length < 10) $state.complete()
        else  {
          $state.loaded()
          page++
        }
      } catch (error) {
        console.log(error);
      }
    }

    const remove = async (todo) => {
      await todoService.delete(todo.id)
      todos.value = todos.value.filter(t => t.id !== todo.id)
    }

    const edit = (todo) => {
      router.push({ name: 'EditTodo', params: { id: todo.id } })
    }

    const filteredTodos = computed(() => {
      return todos.value.filter(todo => {
        const searchRegex = new RegExp(searchQuery.value, 'i')
        return searchRegex.test(todo.title) || searchRegex.test(todo.description)
      })
    })


    return {
      todos,
      loadTodos,
      searchQuery,
      filteredTodos,
      remove,
      edit
    }
  }
})
</script>