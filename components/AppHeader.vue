<template>
    <header class="app-header">
        <svgo-logo-makemake class="logo-makemake" />
        <h1 class="app-header__title">
            Editors {{ store.isMenuOpen }}
        </h1>
        <div class="app-header__right">
            <svgo-logo-rps class="logo-rps" />
            <svgo-icon-menu @click="handleToggleMenu" class="icon-menu" />
        </div>
    </header>
</template>

<script setup>
import { useStore } from "~/store/store.js"
const store = useStore()

const handleToggleMenu = () => {
    store.toggleMenu()
}
</script>

<style scoped>
.app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    margin: 30px 0;
    padding: 0 50px;
    color: var(--rpsg-yellow);
}

.app-header__title {
    color: var(--rpsg-yellow);
    text-align: center;
    font: normal normal normal 18px/22px var(--font-primary);
    letter-spacing: 0px;
}

.app-header__right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 208px;
}

.logo-makemake {
    width: 149px;
    height: 20px;
}

.logo-rps {
    width: 149px;
    height: 50px;
}

.icon-menu {
    width: 30px;
    height: 12px;
    cursor: pointer;
    user-select: none;
}

@media (max-width: 768px) {
    .app-header {
        flex-direction: column;
        padding: 0 20px;
    }
}
</style>