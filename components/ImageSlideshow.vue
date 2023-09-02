<template>
    <div class="slideshow-container" @mouseleave=" intervalId ? stopSlideshow() : null">
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
    //start slideshow from the featured image
    const featuredImageIndex = slideshowImages.value.findIndex(image => image.id === featuredImage.id);
    currentIndex.value = featuredImageIndex;

    intervalId = setInterval(() => {
        currentIndex.value =
            (currentIndex.value + 1) % images.length;
    }, 3000);
};

const stopSlideshow = () => {
    clearInterval(intervalId);
    intervalId = null;
    currentIndex.value = null;
};

const addFeaturedImagesInSlideshow = () => {
    // returns featuredImage object from 'pages' that are not in the 'slideshowImages' list
    const imagesNotInSlideshow = pages.filter(page => !slideshowImages.value.some(slide => page.featuredImage.id === slide.id))
        .map(page => page.featuredImage)

    slideshowImages.value.push(...imagesNotInSlideshow)
}

onBeforeUnmount(() => {
    stopSlideshow();
});

// loads all neccessary images into slideshowImages list
// prevents initial image load when hover over text 
onMounted(() => {
    addFeaturedImagesInSlideshow()
})

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
