<template>
  <div class="datatable__wrapper">
    <DragableItem :key="localIndex + 1650">
      <template #content>
        <table
          :key="localIndex"
          class="datatable Card__table Table"
        >
          <thead
            class="datatable__head"
            :style="theadbg ? `background: ${theadbg}!important;` : ''"
          >
            <tr>
              <th
                v-if="selection"
                class="Table__checkbox"
                style="width: 40px"
              >
                <input
                  :checked="false"
                  type="checkbox"
                  value=""
                  @change="onCheckAllChange"
                >
              </th>
              <th
                v-for="(item, idx) in headers"
                :key="`h${item.value}${idx}`"
                class="datatable__item_head"
                :style="`text-align: ${item.align || 'center'}`"
              >
                <slot
                  :name="`header_${item.value}`"
                  :header="item"
                  :index="idx"
                >
                  {{ item.text }}
                </slot>
              </th>
            </tr>
          </thead>
          <tbody
            v-if="rows.length > 0"
            class="datatable__body"
          >
            <template
              v-for="(item, idx) in rows"
              :key="`d${idx + localIndex}`"
            >
              <tr
                :class="`datatable__responsive__item ${
                  opened.includes(idx) && expandable ? 'active__expand' : ''
                }`"
                @mouseenter="(ev) => onRowHover(ev, item, idx)"
                @mouseleave="(ev) => onRowLeave(ev, item, idx)"
                @click="(ev) => onRowClick(ev, item, idx)"
              >
                <td
                  v-if="selection"
                  class="Table__checkbox"
                >
                  <input
                    :checked="selecteds.includes(idx)"
                    type="checkbox"
                    value=""
                    class="header__text vh"
                    @change="(ev) => onCheckItemChange(ev, idx)"
                  >
                </td>
                <td
                  v-for="(header, i) in headers"
                  :key="`column_responsive${i}_${idx}`"
                >
                  <div class="header__text">
                    {{ header.text }}
                  </div>
                  <slot
                    :name="`item_${header.value}`"
                    :item="{ ...item }"
                    :edited_item="item"
                    :index="idx"
                  >
                    <span class="content__row">{{ item[header.value] }}</span>
                  </slot>
                </td>
              </tr>
              <tr
                :class="`datatable__item ${
                  opened.includes(idx) && expandable ? 'active__expand' : ''
                }`"
                @mouseenter="(ev) => onRowHover(ev, item, idx)"
                @mouseleave="(ev) => onRowLeave(ev, item, idx)"
                @click="(ev) => onRowClick(ev, item, idx)"
              >
                <td
                  v-if="selection"
                  class="Table__checkbox"
                >
                  <input
                    :checked="selecteds.includes(idx)"
                    type="checkbox"
                    value=""
                    @change="(ev) => onCheckItemChange(ev, idx)"
                  >
                </td>
                <td
                  v-for="(header, i) in headers"
                  :key="`column${i}_${idx}`"
                  class="datatable__column"
                  :style="`text-align: ${header.align || 'center'}`"
                >
                  <slot
                    :name="`item_${header.value}`"
                    :item="{ ...item }"
                    :edited_item="item"
                    :index="idx"
                  >
                    {{ item[header.value] }}
                  </slot>
                </td>
              </tr>
              <tr
                :class="`datatable__item_expand ${
                  opened.includes(idx) && expandable ? 'expand__visible' : ''
                }`"
              >
                <td colspan="100%">
                  <div
                    v-if="opened.includes(idx) && expandable"
                    class="item__collapse"
                  >
                    <slot
                      name="item_expand"
                      :item="{ ...item }"
                      :edited_item="item"
                    />
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
          <tbody v-else>
            <tr>
              <td
                colspan="100%"
                style="text-align: center; padding: 15px 0"
              >
                No se encontraron resultados
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </DragableItem>

    <div
      v-if="rows.length > 0"
      class="datatable__footer"
    >
      <div class="footer__result">
        Mostrando
        {{ offsetNum + 1 }} -
        <span
          v-if="customLimit"
          class="select_box"
        >
          <select
            v-model="itemsPerPage"
            class="pagination__select"
            @change="onUpdateLimit"
          >
            <option
              v-for="(opt, idx) in limitOptions"
              :key="`s` + idx"
              :value="opt"
            >
              {{ opt }}
            </option>
          </select>
        </span>
        <span v-else>
          {{ limitNum }}
        </span>
        <!-- {{ limitNum }}  -->
        de
        <strong>{{ totalDocs }}</strong>
        resultado(s)
      </div>
      <div class="footer__pagination">
        <v-pagination
          v-model="page"
          :length="Math.ceil(totalDocs / itemsPerPage)"
          :total-visible="totalPageVisible"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { onMounted, watch } from "vue";

import DragableItem from "@/components/draggable/DragableItem.vue";

const props = defineProps({
  headers: {
    type: Array,
    default: () => [],
  },
  results: {
    type: Array,
    default: () => [],
  },
  page: {
    type: Number,
    default: 1,
  },
  totalPageVisible: {
    type: Number,
    default: 5,
  },
  itemsPerPage: {
    type: Number,
    default: 6,
  },
  totalDocs: {
    type: Number,
    default: 0,
  },
  customLimit: {
    type: Boolean,
    default: false,
  },
  limitOptions: {
    type: Array,
    default: () => [6, 10, 20, 50],
  },
  serverPagination: Boolean,
  selection: Boolean,
  expandable: Boolean,
  isExpandOpen: Boolean,
  singleExpand: Boolean,
  theadbg: {
    type: String,
    default: "",
  },
  selecteds: {
    type: Array,
    default: () => [],
  },
  // events
  onRowHover: {
    type: Function,
    default: () => {},
  },
  onRowLeave: {
    type: Function,
    default: () => {},
  },
  onRowClick: {
    type: Function,
    default: () => {},
  },
});

// emitters
const emit = defineEmits({
  onUpdateSelecteds(payload) {
    return payload;
  },
  onUpdateOptions(payload) {
    return payload;
  },
});

const opened = ref([]);
const selecteds = ref([]);

const headers = ref(props.headers);
const results = ref([...props.results]);
const page = ref(props.page);
const itemsPerPage = ref(props.itemsPerPage);
const totalDocs = ref(
  props.serverPagination ? props.totalDocs : results.value.length
);
const selection = ref(props.selection);
const expandable = ref(props.expandable);
const isExpandOpen = ref(props.isExpandOpen);
const localIndex = ref(659656);
const offsetNum = ref(0);
const limitNum = ref(offsetNum.value + itemsPerPage.value);
const rows = ref([]);

// watchers
watch(page, () => {
  emit("onUpdateOptions", {
    page: page.value,
    itemsPerPage: itemsPerPage.value,
  });
  if (!props.serverPagination) {
    paginateLocal(page.value);
  }
  opened.value = [];
  selecteds.value = [];
});

watch(limitNum, () => {
  if (limitNum.value > totalDocs.value) {
    limitNum.value = totalDocs.value;
  }
});

// Listenners
const onUpdateLimit = () => {
  if (!props.serverPagination) {
    paginateLocal(page.value);
    return
  }
  emit("onUpdateOptions", {
    page: page.value,
    itemsPerPage: itemsPerPage.value,
  });
};

const onCheckAllChange = (ev) => {
  const isChecked = ev.target.checked;
  isChecked ? selectAll() : unSelectAll();
  emit("onUpdateSelecteds", selecteds.value);
  console.log("cambiando estado grupal", selecteds.value);
};

const onCheckItemChange = (ev, idx) => {
  const isChecked = ev.target.checked;
  isChecked ? selectItem(idx) : unSelectItem(idx);
  emit("onUpdateSelecteds", selecteds.value);
  console.log("cambiando estado individual", selecteds.value);
};

// Methods
const paginateLocal = (pageProp = 1) => {
  const totalLocalDocs = totalDocs.value;
  const rowsPerPag = itemsPerPage.value;
  const currentPage = pageProp;
  const offset = currentPage === 1 ? 0 : (currentPage - 1) * rowsPerPag;
  const limit = offset + rowsPerPag;

  offsetNum.value = offset;
  limitNum.value = limit;

  console.log({ rowsPerPag, currentPage, offset, limit, totalLocalDocs });
  rows.value = [
    ...results.value.filter((row, idx) => idx + 1 > offset && idx + 1 <= limit),
  ];
  localIndex.value += 100;
};

const expandRow = (idx) => {
  if (props.singleExpand && opened.value.length > 0) {
    opened.value = [];
  }
  const index = opened.value.indexOf(idx);
  if (index > -1) {
    opened.value.splice(index, 1);
  } else {
    opened.value.push(idx);
  }
};

const collapseRow = (idx) => {
  const index = opened.value.indexOf(idx);
  if (index > -1) {
    opened.value.splice(index, 1);
  }
};

const toggleRow = (idx) => {
  const index = opened.value.indexOf(idx);
  if (index > -1) {
    opened.value.splice(index, 1);
  } else {
    opened.value.push(idx);
  }
};

const selectItem = (idx) => {
  selecteds.value.push(idx);
};

const unSelectItem = (idx) => {
  const index = opened.value.indexOf(idx);
  selecteds.value.splice(index, 1);
};

const selectAll = () => {
  selecteds.value = [];
  rows.value.forEach((item, idx) => selecteds.value.push(idx));
};

const unSelectAll = () => {
  selecteds.value = [];
};

const restoreRow = (idx, item) => {
  rows.value[idx] = { ...item };
};

onMounted(() => {
  paginateLocal(1);
});

defineExpose({
  expandRow,
  collapseRow,
  restoreRow,
  toggleRow,
});
</script>
<script>
export default {
  name: "DataTable",
};
</script>

<style lang="scss">
.datatable__wrapper {
  .select_box {
    position: relative;
    max-width: 45px;
    display: inline-block;
    box-sizing: border-box;
    border: 1px solid var(--color-text-gray-light);
    box-shadow: var(--box-shadow);
    border-radius: var(--border-radius-sm);
    background: var(--color-text-gray-light);

    select {
      padding: 3px 6px;
      width: 50px;
      display: inline-block;
      -webkit-appearance: initial;
      position: relative;
      z-index: 2;
      width: 50px;
      height: 100%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font: inherit;
      outline: none;
      border: none;
      cursor: pointer;
    }

    &::after {
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 6px solid var(--color-text-gray-bold);
      position: absolute;
      top: 40%;
      right: 5px;
      content: "";
      z-index: 1;
    }
  }
  .datatable__container {
    overflow-x: auto;
    max-width: 100%;
    tr,
    tbody {
      max-width: 100%;
    }
  }
  .datatable {
    width: 100%;
    max-width: 100%;
    box-shadow: var(--box-shadow);
    -webkit-box-shadow: var(--box-shadow);
    -moz-box-shadow: var(--box-shadow);
  }
  .datatable__footer {
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .footer__result {
      font-size: clamp(var(--font-size-xs), 5vw, var(--font-size-md));
      color: #555;
    }
  }
  .datatable__search {
    padding: 10px 15px;
    border-radius: 8px;
    outline: none;
    border: none;
  }
}

.v-btn--icon.v-btn--density-default {
  width: calc(var(--pagination-item-heigth) + 2px);
  height: calc(var(--pagination-item-heigth) + 2px);
  font-size: clamp(var(--font-size-sm), 5vw, var(--font-size-md));
}

.v-pagination__list {
  align-items: center;
}
.v-pagination__item {
  border-radius: 0px !important;
  margin: 0 1px;
}
.v-pagination__item.v-pagination__item--is-active button {
  // background: var(--color-primary-300);
  border-radius: 0px !important;
}

.Card {
  border-radius: 4px;
  background: #fff;
  overflow: hidden;
  box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.08),
    0 3px 6px 0 rgba(0, 0, 0, 0.12);

  &__content {
    padding: 20px;
    display: flex;
    align-items: center;

    &--border {
      box-shadow: inset 0 -1px #e3e8ee;
    }
  }
}
.Table {
  width: 100%;
  font-family: "Segoe UI";
  border-spacing: 0;
  overflow-x: auto;
  @media screen and (max-width: 600px) {
    display: flex;
    flex-flow: column nowrap;
  }
  tbody {
    .datatable__responsive__item.active__expand,
    .datatable__item.active__expand {
      background: var(--color-primary-100) !important;
    }

    .datatable__item.active__expand {
      .datatable__column svg.expand__icon {
        transform: rotate(180deg) !important;
      }
    }

    .datatable__responsive__item {
      display: none;
    }
    @media screen and (max-width: 600px) {
      display: flex;
      flex-flow: column nowrap;
      .datatable__item {
        display: none;
      }
      .datatable__responsive__item {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        width: 100%;
        border-bottom: thin solid rgba(0, 0, 0, 0.12);
        td {
          display: grid;
          grid-template-columns: 1fr 2fr;
          border-bottom: 0;
          box-shadow: none;
          padding: 10px 18px;

          .header__text {
            display: inline-block;
            font-weight: 600;

            &:first-of-type {
              padding-top: 10px;
            }
            &:last-of-type {
              padding-bottom: 10px;
            }
          }
          .content__row {
            display: flex;
            justify-content: flex-end;
            &:first-of-type {
              padding-top: 10px;
            }
            &:last-of-type {
              padding-bottom: 10px;
            }
          }
        }
      }
    }

    .datatable__item_expand.expand__visible {
      min-height: 200px;
      .item__collapse {
        height: auto !important;
        opacity: 1 !important;
        visibility: visible;
        transition: all 0.3s, opacity 0.7s;
        display: block;
      }
      & > td {
        padding: 15px 50px;
        max-width: 500px;
        @media screen and (max-width: 600px) {
          padding: 15px 30px;
        }
      }
    }
    .datatable__item_expand {
      height: 0;
      overflow: hidden;
      box-sizing: border-box;
      position: relative;
      border-bottom: thin solid var(--color-primary-500);
      transition: all ease-in-out 0.3s;
      .item__collapse {
        transition: all 0.2s;
        opacity: 0 !important;
        visibility: hidden;
        height: 0 !important;
        display: none;
      }
      & > td {
        padding: 0px 20px;
        // top: 100%;
        // position: absolute;
      }
    }
    td {
      font-size: var(--font-size-md);
      color: var(--color-text-gray-bold);
      font-weight: 500;
      line-height: 20px;
      font-size: clamp(var(--font-size-xs), 4vw, var(--font-size-sm));
    }
  }
  thead {
    background-color: #f7fafc;
    @media screen and (max-width: 600px) {
      th {
        display: none;
      }
    }
    background: var(--color-primary-300);

    th {
      text-transform: uppercase;
      font-size: var(--font-size-sm);
      color: #fff;
      font-weight: 600;
      vertical-align: middle;
      line-height: 20px;
      user-select: none;
      padding: 8px;
    }
  }
  tr {
    position: relative;
    td {
      box-shadow: inset 0 -1px #e3e8ee;
      padding: 8px;

      /* &:first-child {
        padding-left: 20px;
      } */
    }
  }

  &__header {
    &-item {
      display: flex;
      align-items: center;
      cursor: pointer;

      svg {
        margin-left: 8px;
        fill: #8792a2;
      }
    }
  }
  &__checkbox {
    label {
      opacity: 0;
    }
  }

  tr:hover > &__checkbox {
    label {
      opacity: 1;
    }
  }
}
.Table__checkbox {
  text-align: center;
  input {
    cursor: pointer;
  }
}
</style>
