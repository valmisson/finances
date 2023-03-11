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
    title: 'despesas',
    href: '/despesas',
    icon: 'mdi:currency-usd-off'
  },
  {
    order: 3,
    name: 'investments',
    title: 'investimentos',
    href: '/investimentos',
    icon: 'mdi:currency-usd'
  },
  {
    order: 4,
    name: 'transactions',
    title: 'transações',
    href: '/transacoes',
    icon: 'mdi:compare-horizontal'
  }
] as PageMap[]

export function getPageLink (name: string) {
  return pageMap.find(page => page.name === name)?.href
}
