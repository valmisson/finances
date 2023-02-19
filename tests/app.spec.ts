import { $fetch, setup } from '@nuxt/test-utils'

describe('Page -> /', async () => {
  let page: HTMLElement

  await setup({
    dev: true
  })

  beforeEach(async () => {
    page = await $fetch('/')
  })

  it('should render page /', () => {
    expect(page).toBeDefined()
  })

  it('should have page title', () => {
    expect(page).toContain('Finances')
  })
})
