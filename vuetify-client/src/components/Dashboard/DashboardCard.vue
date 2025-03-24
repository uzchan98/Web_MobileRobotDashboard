<script setup>
defineProps({
  variant: String,
});
</script>

<template>
  <v-card :variant="variant" class="mx-auto" color="surface-variant" height="200" max-width="300">
    <v-card-title>Headline</v-card-title>
    <v-card-subtitle> Greyhound divisely hello coldly wonderfully </v-card-subtitle>
    <v-card-actions>
      <v-btn text="Button"></v-btn>
    </v-card-actions>
  </v-card>

  <div class="text-center text-caption">{{ variant }}</div>
</template>
