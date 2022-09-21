<template>
  <HelloWorld/>
</template>

<script>
import HelloWorld from './components/HelloWorld';
export default {
  name: 'App',
  metaInfo: {
    title: 'Renderteam AI Sandbox',
    titleTemplate: '%s'
  },
  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>
