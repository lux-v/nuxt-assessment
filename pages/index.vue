<template>
    <div>
        <image-slideshow :pages="pages" :images="images" />
    </div>
</template>
      
<script setup>
import { useStore } from '~/store/store';
const store = useStore();

const fetchData = async () => {
    try {
        const response = await useFetch("https://raw.githubusercontent.com/funkhaus/technical-assessment/master/db.json");
        const responseJSON = JSON.parse(response?.data?._value || {});

        store.setSiteMeta(responseJSON?.siteMeta || {});

        return responseJSON;
    } catch (error) {
        console.error("Error fetching data:", error);
        return { pages: null, images: null, siteMeta: null };
    }
};

const { siteMeta, pages, images, page } = await fetchData();


useHead({
    title: siteMeta?.title,
    meta: [
        {
            name: "description",
            content: siteMeta?.description,
        },
        {
            name: "thumbnail",
            content: siteMeta?.thumbnail,
        },
        {
            name: "og:title",
            content: page?.title,
        },
        {
            name: "og:description",
            content: page?.excerpt,
        }
    ],
});
</script>
      
<style></style>
      