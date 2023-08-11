import type { Meta, StoryObj } from '@storybook/vue3';
import SocialLinks from '../vweb/common/components/mvtsharelink/social-links.presentational.vue';

const meta: Meta<typeof SocialLinks> = {
    title: 'General/Social Links',
    component: SocialLinks,
    tags: ['autodocs'],
    argTypes: {
        exclude: { control: 'check', options: ['facebook', 'instagram', 'pinterest', 'twitter'] },
    },
    args: {},
};
export default meta;

type Story = StoryObj<typeof SocialLinks>;

export const Default: Story = {};
