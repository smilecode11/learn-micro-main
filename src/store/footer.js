import { ref } from 'vue'

export const footerStatus = ref(true)

export const changeFooter = (type) => footerStatus.value = type