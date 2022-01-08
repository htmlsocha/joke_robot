<template>
  <div id="app" class="mt-4 flex flex-col justify-center justify-items-center align-center ">
    <div class="animate-bounce-slow container-robot">
      <div class="robot-ears">
        <div class="robot-ear-left"></div>
        <div class="robot-ear-right"></div>
      </div>
      <div class="robot-head">
        <div class="pulse"></div>
        <div class="robot-antenna"></div>
        <div class="robot-face">
          <div class="robot-eye-left"></div>
          <div class="robot-eye-right"></div>
          <svg class="robot-mouth" width="100%" height="100%" viewBox="0 0 170 63" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;"><path d="M10,10c11.985,25.848 41.76,42.886 74.947,42.886c33.188,0 62.962,-17.038 74.947,-42.886c-11.985,25.848 -41.759,42.886 -74.947,42.886c-33.187,0 -62.962,-17.038 -74.947,-42.886Z" style="stroke:#000;stroke-width:20px;"/></svg>
        </div>
      </div>
    </div>
    <div class="m-auto mb-4" v-if="first_line">{{ this.first_line }} {{ this.second_line }} </div>
<button class="w-4/12 mt-4 mx-auto text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" @click="telljoke()"> Click to hear joke - or just click J </button>
<p class="text-sm text-gray mx-auto"> Robot made by: Kim Maida ( <a href="https://codepen.io/kmaida/pen/KKVvVjm?editors=1100"> Link Here </a> ) </p>
  </div>
</template>

<script>
import EventService from '@/services/EventService.js'


export default {
  name: 'App',
  data() {
    return {
      response: Object,
      first_line: null,
      second_line: null,
    }
  },
  methods: {
    telljoke() {
      if (this.response.type === "single") {
        this.first_line = this.response.joke
        let first_text = new SpeechSynthesisUtterance(this.first_line);
        first_text.lang = 'en-US'
        speechSynthesis.speak(first_text)
      }

      if (this.response.type === "twopart") {
        this.first_line = this.response.setup
        this.second_line = this.response.delivery
        let first_text = new SpeechSynthesisUtterance(this.first_line);
        let second_text = new SpeechSynthesisUtterance(this.second_line);
        first_text.lang = 'en-US'
        second_text.lang = 'en-US'
        speechSynthesis.speak(first_text)
        speechSynthesis.speak(second_text)
      }

      EventService.getEvents().then(response => {
        this.response = response.data
      })
    },
    handleKeyDown(event){
      if (event.code == "KeyJ" ){
        this.telljoke()
      }
      console.log(event);
    }
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeyDown)
    EventService.getEvents().then(response => {
      this.response = response.data
    })
  }
}


</script>

<style>
.container-robot {
  margin-top: 200px;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: auto;
  position: relative;
  height: 400px;
  width: 800px;
}
.robot-ears {
  background: #D7ECF7;
  border: 10px solid #000;
  border-radius: 44px;
  box-sizing: border-box;
  height: 100px;
  position: absolute;
  left: 155px; top: 80px;
  width: 490px;
}
.robot-head {
  background: #fff;
  border-radius: 120px;
  border: 10px solid #000;
  box-sizing: border-box;
  position: absolute;
  left: 200px;
  width: 400px;
  height: 320px;
}
.pulse {
  background: red;
  border-radius: 500px;
  height: 80px;
  width: 80px;
  position: absolute;
  top: -125px; left: 147px;
  animation: pulse 1s infinite ease-in-out;
}
@keyframes pulse {
  from {
    background: #663399;
    transform: scale(1);
    opacity: 1;
  }
  to {
    background: #fff;
    transform: scale(1.8);
    opacity: 0;
  }
}
.robot-antenna {
  background: #000;
  height: 50px;
  width: 14px;
  position: absolute;
  top: -50px; left: 182px;
}
.robot-antenna:before {
  background: #B88EF4;
  border: 10px solid #000;
  border-radius: 100px;
  box-sizing: border-box;
  content: '';
  display: block;
  position: relative;
  top: -75px; left: -34.5px;
  width: 80px;
  height: 80px;
}
.robot-face {
  box-sizing: border-box;
  background: #94D3F7;
  border-radius: 60px;
  border: 8px solid #000;
  position: absolute;
  top: 50px; left: 50px;
  width: 280px;
  height: 200px;
}
.robot-eye-left,
.robot-eye-right {
  background: #000;
  border-radius: 100px;
  position: absolute;
  top: 50px;
  width: 40px;
  animation: blink 4s infinite ease-in-out;
}
.robot-eye-left {
  left: 56px;
}
.robot-eye-right {
  right: 56px;
}
@keyframes blink {
  0%, 12%, 100% {
    height: 40px;
    top: 50px;
  }
  5%, 7% {
    height: 7px;
    top: 71px;
  }
}
.robot-mouth {
  width: 80px;
  position: absolute;
  left: 92px; top: 30px;
}

</style>