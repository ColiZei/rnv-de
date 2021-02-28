<template>
  <v-autocomplete
    clearable
    append-icon=""
    placeholder="Search ..."
    hide-details=""
    :loading="isLoading"
    :items="normalizedSearchItems"
    prepend-inner-icon="mdi-magnify"
    :hide-no-data="hideNoData"
  ></v-autocomplete>
</template>

<script>
export default {
  props: {
    searchItems: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isLoading: false,
      hideNoData: true
    };
  },
  computed: {
    normalizedSearchItems() {
      const normalized = [];
      this.searchItems.forEach(item => {
        item.markers.forEach(marker => {
          normalized.push({
            text: marker.name,
            name: marker.name,
            group: marker.group
          });
        });
      });
      return normalized;
    }
  }
};
</script>
