<template>
  <v-autocomplete
    clearable
    v-model="select"
    :loading="isLoading"
    :items="items"
    :search-input.sync="search"
    append-icon=""
    placeholder="Search ..."
    prepend-inner-icon="mdi-magnify"
    hide-details
    hide-no-data
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
      hideNoData: true,
      search: null,
      select: null,
      items: []
    };
  },
  watch: {
    search(val) {
      val && val !== this.select && this.queryItems(val);
    }
  },
  computed: {},
  methods: {
    queryItems(v) {
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
      this.items = normalized.filter(e => {
        return (e.text || '').toLowerCase().indexOf((v.text || '').toLowerCase()) > -1;
      });

      // console.log(this.items);
    }
    // loadItems() {
    //   this.isLoading = true;
    //   setTimeout(() => {
    //     this.isLoading = false;

    //     // this.loading = false;
    //   }, 1500);
    // }
  }
};
</script>
