<template>
  <v-container>
    <v-form v-model="formIsValid">
      <v-text-field v-model="name" :rules="rulesName" label="Name" clearable></v-text-field>

      <v-select v-model="group" :rules="groupRules" :items="groupItems" label="Group"></v-select>

      <v-text-field v-model="cLong" :rules="latLongRules" label="Long" clearable></v-text-field>
      <v-text-field v-model="cLat" :rules="latLongRules" label="Lat" clearable></v-text-field>

      <v-text-field
        v-model="openingHours"
        :rules="defaultRules"
        label="Opening Hours"
        clearable
      ></v-text-field>

      <v-text-field v-model="street" :rules="defaultRules" label="Street" clearable></v-text-field>
      <v-text-field v-model="city" :rules="defaultRules" label="City" clearable></v-text-field>
      <v-text-field v-model="zipcode" :rules="zipcodeRules" label="Zipcode"></v-text-field>
      <v-text-field
        v-model="website"
        :rules="defaultRules"
        label="Website"
        clearable
      ></v-text-field>

      <v-textarea name="description" label="Description"></v-textarea>
      <v-checkbox v-model="permanentlyClosed" label="Closed"></v-checkbox>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      formIsValid: false,
      name: '',
      rulesName: [v => (v && v.length >= 3) || 'Name must be at least 3 chars long'],
      // Todo: Get from Backend!
      groupItems: ['Vegan', 'Veggie', 'Omni'],
      group: '',
      groupRules: [v => !!v || 'Group is required'],
      cLong: null,
      cLat: null,
      latLongRules: [v => v % 1 != 0 || 'This Value must be a decimal'],
      openingHours: '',
      street: '',
      city: '',
      zipcode: 0,
      zipcodeRules: [
        v => {
          let valid = v.length < 5 || v.length > 5;
          return !valid || 'Zipcode must be 5 digits long';
        }
      ],
      website: '',
      permanentlyClosed: false,
      defaultRules: [v => !!v || 'This Value should not be empty']
    };
  }
};
</script>
