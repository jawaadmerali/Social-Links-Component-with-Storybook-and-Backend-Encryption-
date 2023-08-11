<template>
    <div class="share-link lh-normal flex space-arround middle">
        <a v-if="!exclude.includes('facebook')" href="https://www.facebook.com/MovotoRealEstate" aria-label="facebook">
            <i class="icon-facebook"></i>
        </a>
        <a v-if="!exclude.includes('twitter')" href="https://twitter.com/movoto?lang=en" aria-label="twitter">
            <i class="icon-twitter"></i>
        </a>
        <a v-if="!exclude.includes('instagram')" href="https://www.instagram.com/movotorealestate/" aria-label="instagram">
            <i class="icon-instagram"></i>
        </a>
        <a v-if="!exclude.includes('pinterest')" href="https://www.pinterest.com/movoto/" aria-label="pinterest">
            <i class="icon-pinterest"></i>
        </a>
    </div>
</template>

<script>
export default {
    name: 'SocialLinks',
    props: {
      exclude: {
        type: Array,
        default: []
      },
    },
};
</script>
