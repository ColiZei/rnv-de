<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :loading="isLoading"
        loading-text="Loading... Please wait"
        :headers="headers"
        :items="markerList"
        :search="search"
        :no-data-text="error"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editMarker(item.id)">mdi-pencil</v-icon>
          <v-icon small @click="deleteMarker(item.id)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      error: false,
      search: '',
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'City', value: 'city' },
        { text: 'Group', value: 'group' },
        { text: 'Type', value: 'type' },
        { text: 'Closed', value: 'permanentlyClosed' },
        { text: 'Created', value: 'createdAt' },
        { text: 'Updated', value: 'updatedAt' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      markerList: []
    };
  },
  methods: {
    async loadMarkers() {
      this.isLoading = true;
      this.error = null;

      try {
        await this.$store.dispatch('adminMarkers/loadMarkers');
      } catch (error) {
        this.error = error.message || 'Failed to fetch data!';
      }

      this.showError = !!this.error;
      this.markerList = this.$store.getters['adminMarkers/getMarkers'];

      this.isLoading = false;
    },
    deleteMarker() {
      console.log('delete!');
    },
    editMarker() {
      console.log('edit!');
    },
    handleError() {}
  },
  created() {
    this.loadMarkers();
  }
};
</script>

<style scoped></style>
