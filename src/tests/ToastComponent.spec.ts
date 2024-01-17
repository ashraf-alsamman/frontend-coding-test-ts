// ToastComponent.spec.ts
import { mount } from '@vue/test-utils';
import ToastComponent from '../components/Toast.vue';
 
jest.mock('../store/ToastStore', () => ({
  useToastStore: jest.fn(() => ({
    isVisible: true,
    message: 'Test Message',
  })),
}));

describe('ToastComponent', () => {
  it('renders the toast message when isVisible is true', async () => {
    const wrapper = mount(ToastComponent);

    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('Test Message');
  });

 
});
