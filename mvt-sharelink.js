import {mapGetters} from 'vuex';
import format from '@/common/utilities/format';
import SocialLinks from './social-links.presentational.vue';

export default {
    name: 'mvtShareLink',
    component: { SocialLinks },
    inject: ['$eventBus'],
    props: ['url', 'description', 'photo', 'text', 'sms', 'propertyData'],
    computed: {
        ...mapGetters('glb', ['glb']),
        getEmailSubject() {
            let subject = '';
            let propertyData = this.propertyData;
            if (this.glb.user && this.glb.user.fullName) {
                subject = `Your friend ${this.glb.user.fullName} `;
            }
            subject = subject + 'shared this property: ';
            if (propertyData && propertyData.price) {
                subject = subject + format.friendlyPrice(propertyData.price);
            }
            if (propertyData && propertyData.bed) {
                subject = subject + ', ' + propertyData.bed + 'bd';
            }
            if (propertyData && propertyData.bath) {
                subject = subject + ', ' + propertyData.bath + 'ba';
            }
            if (propertyData && propertyData.geo && propertyData.geo.zipcode) {
                subject = subject + ' in ' + propertyData.geo.zipcode;
            } else if (propertyData && propertyData.geo && propertyData.geo.neighborhood) {
                subject = subject + ' in ' + propertyData.geo.neighborhood;
            }
            return subject;
        },
        showSMS() {
            return this.glb.isMobile || this.glb.extendedOS === 'MacOS';
        },
    },
    methods: {
        msgto() {
            var smsChar = $.browser && $.browser.versions.ios ? '&' : '&';
            try {
                window.location.href = 'sms:' + smsChar + 'body=' + this.sms;
            } catch (err) {
                console.log(err);
            }
        },
        getTrackingUrl() {
            var additionalTrackingUrl = '&utm_medium=social';
            var trackingUId = '';
            if (this.glb.user.id) {
                trackingUId = this.glb.user.id;
            } else {
                var anonymousId = $.getCookie('ajs_anonymous_id');
                if (anonymousId) {
                    trackingUId = anonymousId.replace(/"/g, '');
                }
            }
            if (trackingUId) {
                additionalTrackingUrl += '&utm_term=' + trackingUId;
            }
            switch (this.glb.pageType) {
                case 'vdpp':
                    additionalTrackingUrl += '&utm_campaign=dppsharing';
                    break;
            }
            if (this.glb.user.role) {
                if (['COBROKER_AGENT', 'AGENT'].includes(this.glb.user.role)) {
                    additionalTrackingUrl += '&utm_content=agentcreated';
                    additionalTrackingUrl += '&agentid=' + btoa(this.glb.user.id);
                } else {
                    additionalTrackingUrl += '&utm_content=user';
                }
            }
            return additionalTrackingUrl;
        },
        facebooklink() {
            var additionalTrackingUrl = this.getTrackingUrl();
            var url = encodeURIComponent(window.location.origin + location.pathname + '?utm_source=facebook' + additionalTrackingUrl);
            var title = encodeURIComponent(this.description);
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${title}`, 'facebook-share-dialog', 'sharer', 'toolbar=0,status=0,width=626,height=436', '_blank');
        },
        twitterlink() {
            var additionalTrackingUrl = this.getTrackingUrl();
            var url = encodeURIComponent(window.location.origin + location.pathname + '?utm_source=twitter' + additionalTrackingUrl);
            var text = encodeURIComponent(this.text);
            window.open(`http://twitter.com/share?url=${url}&text=${text}`, '_blank');
        },
        pinterestlink() {
            var additionalTrackingUrl = this.getTrackingUrl();
            var url = encodeURIComponent(window.location.origin + location.pathname + '?utm_source=pinterest' + additionalTrackingUrl);
            var description = encodeURIComponent(this.description);
            var photo = encodeURIComponent(this.photo);
            window.open(`http://pinterest.com/pin/create/button/?url=${url}&media=${photo}&description=${description}`, '_blank');
        },
        linkedinlink() {
            var additionalTrackingUrl = this.getTrackingUrl();
            var url = encodeURIComponent(window.location.origin + location.pathname + '?utm_source=linkedin' + additionalTrackingUrl);
            //movoto have been banned by linkedin?
            window.open(`http://www.linkedin.com/sharing/share-offsite?url=${url}`, '_blank');
        },
        mailTo() {
            var url = encodeURIComponent(window.location.origin + location.pathname);
            window.location.href = 'mailto:?subject=' + this.getEmailSubject + '&body=See this home on Movoto: ' + url;
        },
        copyUrl(evt) {
            evt.preventDefault();
            var url = window.location.origin + location.pathname;
            document.addEventListener(
                'copy',
                function (e) {
                    e.clipboardData.setData('text/plain', url);
                    e.preventDefault();
                },
                true
            );
            document.execCommand('copy');
            this.$eventBus.$emit('toast-center', { message: 'Link copied', iconClass: 'icon-check-circle-filled' });
        },
    },
};
