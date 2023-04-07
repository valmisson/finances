<template>
  <page-views :title="pageTitle" flat>
    <base-button
      class="item-new"
      @click="gotNew"
    >
      {{ btnTitle }}
    </base-button>

    <base-table
      :headers="tableHeaders"
      :items="tableItems"
      :no-items="tableEmpty"
      class="page-table"
    >
      <template #date="{ value }">
        {{ toDateFormated(value, $i18n.locale) }}
      </template>

      <template #value="{ value, item }">
        <div :class="valueClassColor(item)">
          {{ toCurrencyFormated(value, $i18n.locale, $t('iso4217Code')) }}
        </div>
      </template>

      <template #type="{ value }">
        <div>
          {{ $t(value.value) }}
        </div>
      </template>

      <template #actions="{ itemId }">
        <NuxtLink :to="`${pageLink}/edit/${itemId}`">
          {{ $t('edit') }}
        </NuxtLink>

        <button class="item-remove" @click="removeItem(itemId)">
          {{ $t('remove') }}
        </button>
      </template>
    </base-table>
  </page-views>

  <base-modal-confirm
    :title="modalTitle"
    :show="showModalConfirm"
    @modal:confirm="confirmDeleteItem"
  />
</template>

<script setup lang="ts">
import { TableHeader, TableItem } from '~/types/components/tables'

const props = defineProps<{
  pageTitle: string;
  pageRouteName: string;
  btnTitle: string;
  tableHeaders: TableHeader[];
  tableItems: TableItem[];
  tableEmpty: string;
  modalTitle: string;
}>()

const emit = defineEmits(['deleteItem'])

const showModalConfirm = ref<boolean>(false)
const itemIdBeingDelete = ref<string>()

const pageLink = computed(() => getPageLink(props.pageRouteName))

function gotNew () {
  navigateTo(`${pageLink.value}/new`)
}

function removeItem (itemId: string) {
  showModalConfirm.value = true
  itemIdBeingDelete.value = itemId
}

function confirmDeleteItem (confirmed: boolean) {
  if (confirmed) {
    emit('deleteItem', itemIdBeingDelete.value)
  }

  showModalConfirm.value = false
  itemIdBeingDelete.value = ''
}

function valueClassColor (item: TableItem) {
  if (item?.type) {
    return item.type.value.withdrawal ? 'text-red-500' : 'text-green-500'
  }

  return null
}
</script>

<style scoped>
  .item-new {
    @apply mt-6 mb-2 lg:mt-8 lg:mb-4;
  }

  .page-table {
    @apply mt-6 lg:mt-4;
  }

  .item-remove {
    @apply text-red-500 uppercase;
  }
</style>
