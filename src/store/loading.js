import { ref } from 'vue'

export const loadingRef = ref(false)

export const changeLoading = (status) => {
    loadingRef.value = status
}