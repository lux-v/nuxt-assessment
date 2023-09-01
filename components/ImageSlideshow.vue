<template>
    <div class="slideshow-container" @mouseleave="stopSlideshow()">
        <div v-for="(page) in pages" :key="page.id" class="slideshow-item" @mouseenter="startSlideshow(page.featuredImage)">
            {{ page.title }}
        </div>

        <div class="slideshow-images">
            <img v-for="(image, index) in  slideshowImages " :key="image.id" :srcSet="image.srcSet" :alt="image.altText"
                class="slideshow-image" :class="{ active: currentIndex === index }" @error="handleImageError" />
        </div>
    </div>
</template>

<script setup>
const { pages, images } = defineProps({
    pages: Array,
    images: Array,
});

const currentIndex = ref(null);
const slideshowImages = ref(images);
let intervalId = null;


const startSlideshow = (featuredImage) => {
    stopSlideshow();
    currentIndex.value = 0;

    addFeaturedImageAsFirstElement(featuredImage)

    intervalId = setInterval(() => {
        currentIndex.value =
            (currentIndex.value + 1) % images.length;
    }, 3000);
};

const stopSlideshow = () => {
    clearInterval(intervalId);
    currentIndex.value = null;
};

const addFeaturedImageAsFirstElement = (featuredImage) => {
    const featuredImageExists = slideshowImages.value.find(image => image.id === featuredImage.id)

    featuredImageExists ?
        slideshowImages.value = slideshowImages.value.sort(function (x, y) { return x.id == featuredImage.id ? -1 : y.id == featuredImage.id ? 1 : 0; })
        :
        slideshowImages.value = [featuredImage, ...slideshowImages.value]

}

onBeforeUnmount(() => {
    stopSlideshow();
});

const handleImageError = (event) => {
    console.error('Image failed to load:', event.target.src);
}
</script>

<style scoped>
.slideshow-container {
    position: relative;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 32px;
    column-gap: 200px;
    margin: 50px;
    padding: 100px 0;
}

.slideshow-item {
    color: var(--rpsg-yellow);
    text-align: left;
    font: normal normal normal 24px/29px var(--font-primary);
    letter-spacing: 0px;
    z-index: 10;
    cursor: default;
    width: fit-content;
}

.slideshow-images {
    position: absolute;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
}

.slideshow-image {
    position: absolute;
    width: 90%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}

.slideshow-image.active {
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
}

@media screen and (max-width: 1200px) {
    .slideshow-container {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .slideshow-container {
        grid-template-columns: repeat(1, 1fr);
        justify-items: center;
        margin: 50px 20px;
        padding: 50px 0;
    }

    .slideshow-item {
        text-align: center;
    }
}
</style>
