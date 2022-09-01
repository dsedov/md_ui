<template>
  <v-app id="inspire">
    <v-alert app :value="alert" prominent type="error">{{alertMessage}}</v-alert>
    <v-navigation-drawer app clipped permanent left width="150px" color="transparent" class="pa-2 invisible-scrollbar">
      <v-list id="historycontainer">

      </v-list>
    </v-navigation-drawer>
    <v-main app style="display: flex;justify-content: center;align-items: center;">
      <v-container fluid id="imgcontainer">

      </v-container>
    </v-main>
    <v-navigation-drawer app clipped permanent right color="transparent" class="pa-6">
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
            <v-subheader class="pl-0">
              Seed
            </v-subheader>
            <v-text-field
              solo
              flat
              dense
              :value="seed"
            ></v-text-field>
            <v-btn
     
                  solo
                  elevation="0"

                  label="save"
                  @click="onSave"
                  >save</v-btn>
    </v-navigation-drawer>
    
    <v-footer app color="transparent" height="74" inset class="pl-0">
      <v-container>
        <v-row>
                <v-text-field
                  class="ma-4"
                  filled
                  solo
                  flat
                  dense
                  v-model="prompt.val"
                  ></v-text-field>
                <v-btn
                  class="mt-4 mr-4 mb-4"
                  solo
                  elevation="0"
                  style="padding:20px;"
                  label="generate"
                  @click="onGenerate"
                  >generate</v-btn>
  
          </v-row>
        </v-container>
    </v-footer>
    
  </v-app>
</template>
<style >
  #imgcontainer > img {
    display:block;
    height:calc(100vh - 100px);
    width:auto;
    margin-left: auto;
    margin-right:auto;
    max-width:100%;
    max-height:100%
  }
  ::-webkit-scrollbar {
    width: 15px;
  }
  ::-webkit-scrollbar-track {
    background: black;
    opacity: 0.5;
  }
  ::-webkit-scrollbar-thumb {
    background:#181818;
    opacity: 0.5;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #2c2c2c;
    opacity: 1.0;
  }
</style>
<script>
  export default {
    data: () => ({
      alert: false,
      prompt: { val: "magical forest painting by peter mohrbacher and georges seurat"},
      showImage: false,
      currentImageData: 0,
      currentImageUrl: "test.html",
      currentImageName: "no_name.jpg",
      seed:0,
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
      onSave() {
        var a = document.createElement("a");
        a.href = this.currentImageUrl,
        a.download = this.currentImageName,
        a.click()  
        console.log(a.href)
      },
      onGenerate() {
        var seedNumber = Math.floor(Math.random() * 100000000);
        this.seed = seedNumber
        var imgUrl = "http://192.168.4.214:8000/prompt/?q=" + this.prompt.val + "&w=" + this.width.val + "&h=" + this.height.val + "&scale=" + this.scale.val + "&steps=" + this.steps.val + "&seed=" + seedNumber
        document.querySelector('#imgcontainer').innerHTML = ''
        let img = document.createElement('img')
        var downloadingImage = new Image();
        downloadingImage.onload = function(){
          img.src  = this.src;   
        };
        downloadingImage.src = imgUrl;
        document.querySelector('#imgcontainer').appendChild(img)
        /*
        var imgUrl = "http://192.168.4.214:8000/prompt/?q=" + this.prompt.val + "&w=" + this.width.val + "&h=" + this.height.val + "&scale=" + this.scale.val + "&steps=" + this.steps.val
        this.currentImageUrl = imgUrl;
        fetch(imgUrl,
          {method:"GET"}
        )
        .then((response) => {
          this.currentImageName = response.headers.get("file-name")
          this.seed = response.headers.get("seed-number")
          response.blob().then(blobResponse => {
            let reader = new FileReader();
            reader.readAsDataURL(blobResponse); 
            reader.onloadend = function() {
              let base64data = reader.result; 
              let img = document.createElement('img')
              img.src = base64data  
              
              this.currentImageData = base64data.replace("data:image/png;base64,","")
              
              document.querySelector('#imgcontainer').innerHTML = ''
              document.querySelector('#imgcontainer').appendChild(img)

              let img_hist = document.createElement('img')
              img_hist.setAttribute("style", "max-width:100%;")
              img_hist.src = base64data 
              document.querySelector('#historycontainer').insertBefore(img_hist, document.querySelector('#historycontainer').firstChild)
            }
          })
        }); */
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

