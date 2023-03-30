import { PageMap } from '~/types/interface/pageMap'

export const pageMap = [
  {
    order: 1,
    name: 'home',
    title: 'overview',
    href: '/',
    icon: 'mdi:home'
  },
  {
    order: 2,
    name: 'expenses',
    title: 'expense',
    titlePlural: true,
    href: '/expenses',
    icon: 'mdi:currency-usd-off'
  },
  {
    order: 3,
    name: 'investments',
    title: 'investment',
    titlePlural: true,
    href: '/investments',
    icon: 'mdi:currency-usd'
  },
  {
    order: 4,
    name: 'transactions',
    title: 'transaction',
    titlePlural: true,
    href: '/transactions',
    icon: 'mdi:compare-horizontal'
  }
] as PageMap[]

export function getPageLink (name: string) {
  return pageMap.find(page => page.name === name)?.href
}
