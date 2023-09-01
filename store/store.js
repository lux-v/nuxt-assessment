import { defineStore } from 'pinia'

// I've tried to use Vuex, but I couldn't get it to work with Nuxt 3+.
export const useStore = defineStore("store", () => {
    const siteMeta = ref({})
    const isMenuOpen = ref(false)

    const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value
    }

    const setSiteMeta = (data) => {
        siteMeta.value = data
    }

    return {
        siteMeta,
        isMenuOpen,
        toggleMenu,
        setSiteMeta,
    }
})