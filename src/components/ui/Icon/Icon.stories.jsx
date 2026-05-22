import Icon from './Icon';

export default {
  title: 'Atoms/Icon',
  component: Icon,
  argTypes: {
    color: { control: 'color' },
    size: { control: 'number' },
  },
};

export const Default = {
  args: {
    icon: 'mdi:home',
    size: 48,
    color: 'var(--color-main)',
  },
};

export const CustomColor = {
  args: {
    icon: 'mdi:alert',
    size: 64,
    color: 'var(--color-danger)',
  },
};

export const Smaller = {
  args: {
    icon: 'mdi:compass',
    size: 24,
    color: 'var(--color-text)',
  },
};
