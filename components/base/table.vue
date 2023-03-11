<template>
  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th
            v-for="header in props.headers"
            :key="header.value"
            scope="col"
            :class="{
              'sortable': header.sortable,
              'sorted': header.sortable && sorted > 0,
              'sorted-rotate': header.sortable && sorted > 1
            }"
            @click="() => header.sortable && sortBy(header.value)"
          >
            {{ header.text }}

            <Icon
              v-if="header.sortable"
              name="mdi:arrow-up"
              class="sortable-icon"
            />
          </th>

          <th
            v-if="slots.actions"
            scope="col"
            class="actions"
          >
            <span>Edit</span>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="itemTable in tableItems"
          :key="itemTable._id"
        >
          <td
            v-for="(item, index) in tableTtemsWithoutId(itemTable)"
            :key="Math.random(index)"
          >
            <slot :name="item.name" :value="item.value" :item="itemTable">
              {{ item.value }}
            </slot>
          </td>

          <td
            v-if="slots.actions"
            class="actions"
          >
            <slot name="actions" :item-id="itemTable._id" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '#components'

import { TableHeader, TableItem } from '~/types/components/tables'

const props = defineProps<{
  headers: TableHeader[],
  items: TableItem[]
}>()

const slots = useSlots()

const sorted = ref<number>(0)
const tableItems = ref<TableItem[]>([])

onMounted(async () => {
  await nextTick()

  tableItems.value = genTableItems(props.items)
})

function genTableItems (items: TableItem[]): TableItem[] {
  const headers = props.headers.flatMap(h => h.value)

  // sort items with headers
  return items.map((item) => {
    const newItem: TableItem = {}

    for (const h of headers) {
      newItem[h] = {
        name: h,
        value: item[h]
      }
    }

    newItem._id = item.id

    return newItem
  })
}

function tableTtemsWithoutId (item: TableItem): TableItem {
  const newItem = Object.assign({}, item)

  delete newItem._id

  return newItem
}

function sortBy (value: string): void {
  const desc = (a: TableItem, b: TableItem) => {
    return a[value] > b[value] ? 1 : -1
  }

  const asc = (a: TableItem, b: TableItem) => {
    return a[value] < b[value] ? 1 : -1
  }

  const reset = () => {
    tableItems.value = genTableItems(props.items)

    sorted.value = 0
  }

  sorted.value++

  sorted.value === 1 ? tableItems.value.sort(desc) : sorted.value === 2 ? tableItems.value.sort(asc) : reset()
}
</script>

<style scoped>
  .table-wrapper {
    @apply relative overflow-x-auto;
  }

  .card th,
  .card td {
    @apply first:pl-0 last:pr-0;
  }

  table {
    @apply bg-white w-full text-left;
  }

  th {
    @apply text-sm text-gray-500 font-normal
      px-4 pt-3 pb-2;
  }

  th.actions span {
    @apply sr-only;
  }

  tbody tr {
    @apply border-b border-separate last:border-none;
  }

  td {
    @apply whitespace-nowrap text-ellipsis overflow-hidden
      text-base px-4 py-3 first:pr-0;
  }

  td.actions {
    @apply text-xs font-medium flex justify-end gap-6;
  }

  .sortable {
    @apply flex items-center cursor-pointer
      hover:text-gray-800;
  }

  .sortable .sortable-icon {
    @apply invisible transition-all duration-300 ml-1;
  }

  .sortable:hover .sortable-icon {
    @apply visible transition-all duration-300;
  }

  .sorted {
    @apply text-gray-800;
  }

  .sorted .sortable-icon {
    @apply visible rotate-0;
  }

  .sorted-rotate .sortable-icon {
    @apply rotate-180 transition-transform duration-300;
  }
</style>
