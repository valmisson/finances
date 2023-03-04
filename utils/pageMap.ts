import { PageMap } from '~/types/pageMap.interface'

export default [
  {
    order: 1,
    title: 'overview',
    href: '/',
    icon: 'mdi:home'
  },
  {
    order: 2,
    title: 'despesas',
    href: '/despesas',
    icon: 'mdi:currency-usd-off'
  },
  {
    order: 3,
    title: 'investimentos',
    href: '/investimentos',
    icon: 'mdi:currency-usd'
  },
  {
    order: 4,
    title: 'transações',
    href: '/transacoes',
    icon: 'mdi:compare-horizontal'
  }
] as PageMap[]
