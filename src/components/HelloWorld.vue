<template>
  <v-app id="inspire" >
    <v-alert
      :value="alert"
      prominent
      type="error"
    >{{alertMessage}}</v-alert>

      
    <v-main>
      <v-container style="height: 100vh;">
        <v-row class="pt-8 fill-height" >
          <v-col cols="16" sm="9" class="fill-height">
            <v-row style="min-height:calc(100vh - 200px)">
              <v-img
                lazy-src="https://picsum.photos/id/11/10/6"
                max-height="100%"
                max-width="100%"
                v-if="showImage"
                :src="generatedImage"
                @load="onImageLoad"
              ></v-img>
            </v-row>
            
            <v-row  class="pt-8">
              <v-col cols="10">
              <v-textarea
                rows="2"
                outlined
                label="Prompt"
                value="Default Value"
                ></v-textarea>
              </v-col>
              <v-col cols="2">
              <v-btn
                label="generate"
                class="white--text"
                elevation="2"
                outlined
                @click="onGenerate"
                >generate</v-btn>
              </v-col>
            </v-row>
          </v-col>

          <v-col
            cols="8"
            sm="3"
          >

          <v-subheader class="pl-0">
            Width
          </v-subheader>
          <v-slider 
            :label="width.val"
            v-model="width.val"
            :thumb-color="width.color"
            :min="512"
            :max="1024"
            step="64"
            ticks="always"
            tick-size="2"
            thumb-label
            inverse-label
            ></v-slider>

          <v-subheader class="pl-0">
            Height
          </v-subheader>
          <v-slider 
            :label="height.val"
            v-model="height.val"
            :thumb-color="height.color"
            :min="512"
            :max="1024"
            step="64"
            ticks="always"
            tick-size="2"
            thumb-label
            inverse-label
            ></v-slider>

          <v-subheader class="pl-0">
            Scale
          </v-subheader>
          <v-slider 
            :label="scale.val"
            v-model="scale.val"
            :thumb-color="scale.color"
            :min="1"
            :max="20"
            thumb-label
            inverse-label
            ></v-slider>
          <v-subheader class="pl-0">
            Steps
          </v-subheader>
          <v-slider 
            :label="steps.val"
            v-model="steps.val"
            :thumb-color="scale.color"
            :min="10"
            :max="150"
            thumb-label
            inverse-label
            ></v-slider>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      alert: false,
      showImage: false,
      generatedImage: "imagepath",
      alertMessage: "Warning, generated images contained some not safe for work content and have been replaced.",
      links: [
        'Dashboard',
        'Messages',
        'Profile',
        'Updates',
      ],
      width: { label: 'width', val: 512, color: 'blue lighten-1'},
      height: { label: 'height', val: 512, color: 'blue lighten-1'},
      scale: { label: 'scale', val: 7, color: 'blue lighten-1' },
      steps: { label: 'steps', val: 50, color: 'blue lighten-1' },
    }),
    methods: {
      onGenerate() {
        this.generatedImage = "https://images.unsplash.com/photo-1661386290029-914a541a1995?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80";
        this.showImage = true
        //this.warning("some warning");
      },
      onImageLoad(){

      },
      warning(text) {
        this.alertMessage = text
        this.alert = true;
        window.setTimeout(() => {
          this.alert = false;
          console.log("hide alert after 3 seconds");
        }, 3000) 
      }
    }
  }
</script>

<style scoped>
html { overflow-y: auto }
.theme--dark.v-application {
  background-color: var(--v-background-base, #121212) !important;
}
.theme--light.v-application {
  background-color: var(--v-background-base, white) !important;
}
.v-alert {
  position: fixed;
  top: 0px;
  width:100%;
  margin: 0 auto; 
  z-index:1000;
}
</style>