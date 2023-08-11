<template>
    <div class="share-link lh-normal" :class="url ? 'grid grid-xs-2' : 'flex space-arround middle' ">
        <template v-if="url">
            <div class="wrap f4">Or, share via: </div>
            <a @click="e => copyUrl(e)">
                <i class="icon-link-alt"></i>
                <span>Copy Link</span>
            </a>
            <a @click='facebooklink' v-nhs:click="{code: 'Social'}">
                <i class="icon-facebook"></i>
                <span>Facebook</span>
            </a>
            <a @click="mailTo">
                <i class="icon-envelope-o"></i>
                <span>Email</span>
            </a>
               <a @click='twitterlink' v-nhs:click="{code: 'Social'}">
                <i class="icon-twitter"></i>
                <span>Twitter</span>
            </a>
            <a @click="msgto" v-if="showSMS">
                <i class="icon-mvt-chat"></i>
                <span>SMS</span>
            </a>
            <a @click='pinterestlink' v-nhs:click="{code: 'Social'}">
                <i class="icon-pinterest"></i>
                <span>Pinterest</span>
            </a>
        </template>
        <template v-else>
            <SocialLinks />
        </template>
    </div>
</template>
<script src="./mvt-sharelink.js"></script>
