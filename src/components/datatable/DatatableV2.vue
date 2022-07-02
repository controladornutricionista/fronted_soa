<template>
  <div>
    <DataTable
      v-if="loading"
      class="datatable__v2"
      :value="defaultData"
    >
      <template v-if="loading">
        <Column
          v-for="(item, idx) in headers"
          :key="`S_${getUuid()}${idx}`"
          :field="item.value"
          :header="item.text"
          :class="{ [item.align]: item.align }"
          :sortable="item.sortable"
        >
          <template #body>
            <Skeleton />
          </template>
        </Column>
      </template>
    </DataTable>
    <DataTable
      v-else
      v-model:selection="localSelecteds"
      v-model:filters="filters"
      class="datatable__v2"
      :class="{ 'datatable__v2--sticky_header': stickyHeader }"
      :value="results"
      :paginator="paginator"
      :rows="itemsPerPage"
      :data-key="dataKey"
      show-gridlines
      column-resize-mode="fit"
      responsive-layout="scroll"
      filter-display="menu"
      :paginator-template="paginatorTemplate"
      :rows-per-page-options="rowsPerPageOptions"
      :scroll-height="maxHeight"
      :current-page-report-template="currentPageReportTemplate"
      :first="first"
      :sort-field="sortField"
      :sort-order="sortOrder"
      @page="onPageChange"
      @sort="onSortChange"
      @filter="onFilterChange"
    >
      <Column
        v-if="showColumnSelect"
        selection-mode="multiple"
        header-style="width: 2rem"
      />

      <Column
        v-for="(item, idx) in headers"
        :key="`I_${item.value}${getUuid()}${idx}`"
        :field="item.value"
        :header="item.text"
        :class="{ [item.align]: item.align }"
        :sortable="item.sortable"
      >
        <template #body="{ data }">
          <slot
            :name="`item_${item.value}`"
            :item="{ ...data }"
          >
            {{ data[item.value] }}
          </slot>
        </template>
        <template
          v-if="item.filter"
          #filter="{ filterModel, filterCallback }"
        >
          <form @submit.prevent="filterCallback()">
            <div class="mb-2 font-bold">
              {{ item.filter?.title ?? "Filtrar por" }}
            </div>
            <slot
              :name="`filter_${item.value}`"
              :filter-model="filterModel"
              :filter-callback="filterCallback"
            >
              <FilterInput
                :value="filterModel.value"
                :placeholder="item.filter?.placeholder"
                :type="item.filter?.type ?? 'text'"
                @update-text="filterModel.value = $event"
                @submit-filter="filterCallback()"
              />
            </slot>
          </form>
        </template>
      </Column>

      <template #paginatorstart>
        <div
          v-if="filters"
          class="filters__section"
        >
          <!-- <span class="title__filter">
            <strong>
              Filtrado por:
            </strong>
          </span> -->
          <ul
            class="filters__list"
          >
            <template
              v-for="(item, idx) in Object.keys(filters)"
              :key="`F_${baseUUID}${getUuid()}_${idx}`"
            >
              <li
                v-if="filters[item]?.value"
                @click="removeFilter(item)"
              >
                {{ filters[item]?.value }}
              </li>
            </template>
          </ul>
        </div>
        <!-- <Button
          v-if="showRefreshButton"
          v-tooltip="'Recargar lista'"
          type="button"
          icon="pi pi-refresh"
          class="p-button-text"
          @click="emit('refreshData')"
        /> -->
      </template>
    </DataTable>
  </div>
</template>

<script setup>
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Skeleton from "primevue/skeleton";
import FilterInput from "./FilterInput.vue";

import { FilterMatchMode, FilterOperator } from "primevue/api";
import { computed, onMounted, onUpdated, ref, watch } from "vue";
import { useStore } from "vuex";
import { uuid } from "vue-uuid";

const store = useStore();

const emit = defineEmits([
  "onUpdateSelecteds",
  "refreshData",
  "onOptionsChange",
  "onFiltersChange",
]);
const props = defineProps({
  dataKey: {
    type: String,
    default: "ID",
  },
  limit: {
    type: Number,
    default: 6,
  },
  loading: Boolean,
  rowsLoading: {
    type: Number,
    default: 6,
  },
  sortField: {
    type: String,
    default: null,
  },
  sortOrder: {
    type: Number,
    default: null,
  },
  paginator: Boolean,
  headers: {
    type: Array,
    default: () => [],
  },
  results: {
    type: Array,
    default: () => [],
  },
  first: {
    type: Number,
    default: 0,
  },
  selecteds: {
    type: Array,
    default: () => [],
  },
  filterOptions: {
    type: Object,
    default: null,
  },
  stickyHeader: Boolean,
  theadbg: {
    type: String,
    default: "var(--color-primary-300)",
  },
  maxHeight: {
    type: String,
    default: "100%",
  },
  paginatorTemplate: {
    type: String,
    default:
      "CurrentPageReport RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink",
  },
  rowsPerPageOptions: {
    type: Array,
    default: () => [6, 10, 20, 30, 50],
  },
  currentPageReportTemplate: {
    type: String,
    default: "Mostrando {first} - {last} de {totalRecords} resultados",
  },
  showRefreshButton: Boolean,
  showColumnSelect: Boolean,
});

const localSelecteds = ref(props.selecteds);
const theadBackground = ref(props.theadbg ?? "var(--color-primary-300)");
const itemsPerPage = ref(props.limit);
const defaultData = ref(new Array(props.rowsLoading));
const baseUUID = ref(uuid.v1());

const removeFilter = (key) => {
  filters.value[key].value = null
}

const generateFilters = () => {
  const obj = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  };
  for (const head of props.headers) {
    if (head?.filter) {
      obj[head.value] = {
        matchMode: FilterMatchMode[head?.filter?.matchMode],
        value: null,
      };
    }
  }
  return obj;
};

const filters = ref(
  props.filterOptions ?? {
    ...generateFilters(),
  }
);

const items = computed(() => store.getters.getMailbagList);

const getFiltersSelecteds = () => {
  return Object.keys(filters)
    .filter((key) => filters.value[key].value)
    .map((key) => {
      return `${key}: ${filters.value[key].value}`;
    });
};
const getUuid = () => {
  return uuid.v4();
};

const onPageChange = (ev) => {
  emit("onOptionsChange", {
    page: ev.page,
    limit: ev.rows,
    first: ev.first,
    sortField: ev.sortField,
    sortOrder: ev.sortOrder,
    // filters: ev.filters
  });
};

const onSortChange = (ev) => {
  emit("onOptionsChange", {
    page: ev.page,
    limit: ev.rows,
    first: ev.first,
    sortField: ev.sortField,
    sortOrder: ev.sortOrder,
    // filters: ev.filters
  });
};

const onFilterChange = (ev) => {
  emit("onFiltersChange", {
    filters: JSON.parse(JSON.stringify(ev.filters)),
  });
};

watch(localSelecteds, (current, old) => {
  emit("onUpdateSelecteds", current);
});
</script>

<style lang="scss">
.datatable__v2 {
  .p-datatable-wrapper {
    &::-webkit-scrollbar {
      width: 10px;
      height: 15px;
      z-index: 5;
    }

    &::-webkit-scrollbar-track {
      background: var(--color-fondo-dark);
    }

    &::-webkit-scrollbar-thumb {
      border: 2px solid var(--color-fondo-dark);
      background: var(--scroll-color);
      border-radius: 4px;
      z-index: 5;
    }
  }
  // thead
  &--sticky_header {
    thead {
      position: sticky !important;
      top: -1px !important;
      z-index: 2 !important;
    }
  }
  /* .p-datatable-thead {
    background: v-bind(theadBackground) !important;
    th:not(.p-highlight) {
      background: v-bind(theadBackground) !important;
      .p-column-title {
        color: var(--color-white) !important;
      }
    }
    th.p-highlight {
      background: var(--color-primary-500) !important;
    }
  }
  .p-column-title {
    font-size: var(--font-size-xxs) !important;
    white-space: nowrap;
  }
  .p-datatable-tbody > tr.p-highlight {
    color: var(--color-primary-400) !important;
  }
  tr:not(.p-highlight):nth-child(2n) {
    background: var(--alternate-color) !important;
    td {
      color: var(--color-text-gray-bold) !important;
    }
  } */

  // texts & td,  th
  /* td {
    font-size: var(--font-size-xs) !important;
    line-height: 1.16 !important;
    font-weight: 600 !important;
  }
  th,
  td {
    padding: 5px !important;
  } */
  .start {
    text-align: left !important;
  }
  .center {
    text-align: center !important;
  }
  .end,
  .rigth {
    text-align: end !important;
  }
  // icons
  .p-sortable-column-icon {
    vertical-align: initial !important;
    margin-left: 0.3rem !important;
    display: inline-flex !important;
    align-items: center !important;
    width: 12px !important;
    height: auto !important;
  }
  .p-sortable-column.p-highlight,
  .p-sortable-column.p-highlight .p-sortable-column-icon {
    // color: var(--color-white) !important;
  }
  .pi-sort-alt:before {
    // color: var(--color-white) !important;
    font-size: 9px !important;
  }
  .pi-sort-amount-up-alt:before,
  .pi-sort-amount-down:before {
    font-size: var(--font-size-xs) !important;
  }
  .p-column-filter-menu-button {
    width: 1.5rem !important;
    height: 1.5rem !important;
    margin-left: 3px !important;
    &:not(.p-column-filter-menu-button-active, .p-column-filter-menu-button-open, :focus, :active, :hover) {
      // color: var(--color-white) !important;
    }
    &:focus:not(.p-column-filter-menu-button-active, .p-column-filter-menu-button-open),
    &:active:not(.p-column-filter-menu-button-active, .p-column-filter-menu-button-open) {
      // color: var(--color-white) !important;
    }
    .pi-filter-icon {
      font-size: var(--font-size-sm) !important;
    }
  }
  /* .p-column-filter-menu-button:not() {
    
  } */
  // pagination
  .p-paginator {
    padding: 0 0.8rem !important;
    .pi {
      font-size: var(--font-size-xs) !important;
    }
    .p-button.p-button-icon-only {
      padding: 0.5rem !important;
      width: 2rem !important;
    }
  }
  .p-paginator .p-paginator-first,
  .p-paginator .p-paginator-prev,
  .p-paginator .p-paginator-next,
  .p-paginator .p-paginator-last,
  .p-paginator .p-paginator-pages .p-paginator-page {
    min-width: 30px !important;
    height: 30px !important;
  }
  .p-paginator-current {
    font-size: var(--font-size-xs) !important; 
  }
  .p-paginator-page {
    font-size: var(--font-size-sm) !important;
  }
  .p-paginator .p-paginator-pages .p-paginator-page.p-highlight {
    color: var(--color-primary-500) !important;
  }
  .p-paginator .p-dropdown {
    height: 30px !important;
    .p-dropdown-label {
      padding: 0.25rem 0.35rem !important;
    }
    .p-dropdown-trigger {
      width: 30px !important;
    }
  }
}
// filters
.p-column-filter-overlay {
  max-width: 13rem !important;
}
.p-column-filter-constraints {
  .p-column-filter-matchmode-dropdown {
    display: none !important;
  }
}

.p-column-filter-overlay-menu .p-column-filter-constraint,
.p-column-filter-buttonbar {
  padding: 10px 15px !important;
}

.p-column-filter-buttonbar {
  padding-top: 0 !important;
  .p-button.p-button-outlined {
    color: var(--color-primary-400) !important;
  }
  button {
    padding: 6px 10px !important;
    font-size: var(--font-size-sm) !important;
  }
}
.p-column-filter-overlay {
  z-index: 5 !important;
}

.filters__section {
  display: flex;
  gap: 8px;
  .title__filter {
    font-size: var(--font-size-xs);
    font-weight: bold !important;
  }
  .filters__list {
    list-style: none !important;
    gap: 3px;
    display: inline-flex;
    flex-wrap: wrap;
    li {
      height: auto;
      padding: 3px 8px;
      border-radius: var(--border-radius-md);
      color: var(--color-primary-500);
      font-weight: 500;
      background: var(--color-primary-100);
      font-size: var(--font-size-xs);
      max-height: 22px;
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: all ease-in-out .2s;
      position: relative;
      overflow: hidden;
      &::after {
        transition: all ease-in-out .2s;
      }
      &:hover {
        &::after {
          z-index: 2;
          background: var(--color-danger-200);
          content: "";
          background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xOSAyNGgtMTRjLTEuMTA0IDAtMi0uODk2LTItMnYtMTdoLTF2LTJoNnYtMS41YzAtLjgyNy42NzMtMS41IDEuNS0xLjVoNWMuODI1IDAgMS41LjY3MSAxLjUgMS41djEuNWg2djJoLTF2MTdjMCAxLjEwNC0uODk2IDItMiAyem0wLTE5aC0xNHYxNi41YzAgLjI3Ni4yMjQuNS41LjVoMTNjLjI3NiAwIC41LS4yMjQuNS0uNXYtMTYuNXptLTkgNGMwLS41NTItLjQ0OC0xLTEtMXMtMSAuNDQ4LTEgMXY5YzAgLjU1Mi40NDggMSAxIDFzMS0uNDQ4IDEtMXYtOXptNiAwYzAtLjU1Mi0uNDQ4LTEtMS0xcy0xIC40NDgtMSAxdjljMCAuNTUyLjQ0OCAxIDEgMXMxLS40NDggMS0xdi05em0tMi03aC00djFoNHYtMXoiLz48L3N2Zz4");
          background-size: 13px;
          background-repeat: no-repeat;
          background-position: center;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}
</style>
