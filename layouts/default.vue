<template>
    <div class="layout">
        <app-header />
        <div class="content">
            <slot />
        </div>
    </div>
</template>

<script>
</script>

<style scoped>
.layout {
    display: flex;
    flex-direction: column;
    min-height: var(--unit-100vh);
    background-color: var(--black);
}
</style>