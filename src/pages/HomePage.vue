<template>
  <div class="home-container">
    <div class="main-container">
      <img
        :src="imgToday"
        alt="Kit Ancheta's background image for today"
        class="bg-img"
      />
      <div class="details-container">
        <div class="question-container">
          <p class="question" v-show="historicalEventList.length < 1">
            Yo, wanna know what went down today in history?
          </p>
          <p class="question" v-show="historicalEventList.length > 0">
            HISTORY TODAY
          </p>
        </div>
        <div
          class="event-container"
          v-show="isLoading || historicalEventList.length > 0"
        >
          <img
            src="https://res.cloudinary.com/dz1lbexlg/image/upload/v1737729478/loading_nsnfun.gif"
            alt="loading screen while waiting for Kit Ancheta's historical data"
            class="gif-icon"
            v-show="isLoading"
          />
          <p class="year" v-show="historicalEventList.length > 0">
            Year
            {{ typedYear }}
          </p>
          <p class="event-details" v-show="historicalEventList.length > 0">
            {{ typedEvent }}
          </p>
        </div>
        <div class="btn-container">
          <button
            class="go-btn"
            @click="fetchHistoricalEvents"
            v-show="historicalEventList.length < 1"
            :disabled="isLoading"
          >
            Bet, I'm all in!
          </button>
          <button
            class="go-btn"
            @click="
              toggleEvent('prev');
              toggleRandomImg();
            "
            v-show="historicalEventList.length > 0"
          >
            Prev
          </button>
          <button
            class="go-btn"
            @click="
              toggleEvent('next');
              toggleRandomImg();
            "
            v-show="historicalEventList.length > 0"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHistoricalEvents } from "@/services/api";

export default {
  data() {
    return {
      imgList: [
        "https://res.cloudinary.com/dz1lbexlg/image/upload/v1737719090/1_xcauxg.jpg",
        "https://res.cloudinary.com/dz1lbexlg/image/upload/v1737719090/3_mprgku.jpg",
        "https://res.cloudinary.com/dz1lbexlg/image/upload/v1737719090/2_ulj3hg.jpg",
        "https://res.cloudinary.com/dz1lbexlg/image/upload/v1737719089/6_gjbago.jpg",
        "https://res.cloudinary.com/dz1lbexlg/image/upload/v1737719089/5_mkwo7g.jpg",
        "https://res.cloudinary.com/dz1lbexlg/image/upload/v1737719090/4_trlzmt.jpg",
        "https://res.cloudinary.com/dz1lbexlg/image/upload/v1737719089/15_xjezna.jpg",
        "https://res.cloudinary.com/dz1lbexlg/image/upload/v1737719089/14_f4axor.jpg",
        "https://res.cloudinary.com/dz1lbexlg/image/upload/v1737719089/7_lei9da.jpg",
        "https://res.cloudinary.com/dz1lbexlg/image/upload/v1737719089/8_jnrzkg.jpg",
        "https://res.cloudinary.com/dz1lbexlg/image/upload/v1737719089/16_sukwbt.jpg",
        "https://res.cloudinary.com/dz1lbexlg/image/upload/v1737719088/10_gjxcw1.jpg",
        "https://res.cloudinary.com/dz1lbexlg/image/upload/v1737719089/9_j3iota.jpg",
        "https://res.cloudinary.com/dz1lbexlg/image/upload/v1737719088/17_xvyrte.jpg",
        "https://res.cloudinary.com/dz1lbexlg/image/upload/v1737719088/11_b7kcq4.jpg",
        "https://res.cloudinary.com/dz1lbexlg/image/upload/v1737719088/12_s04ivv.jpg",
        "https://res.cloudinary.com/dz1lbexlg/image/upload/v1737719088/13_kje0ew.jpg",
      ],
      imgToday: "",
      historicalEventList: [],
      selectedEventIndex: 0,
      isLoading: false,
      typedYear: "",
      typedEvent: "",
      typingInterval: null,
    };
  },

  methods: {
    async fetchHistoricalEvents() {
      this.isLoading = true;
      const today = new Date();
      const month = today.getMonth() + 1;
      const day = today.getDate();

      try {
        const data = await getHistoricalEvents(month, day);
        this.historicalEventList = data;
        this.selectedEventIndex = data.length - 1;
      } catch (e) {
        console.error(e);
      }
      this.isLoading = false;
    },
    toggleEvent(type) {
      this.typedYear = "";
      this.typedEvent = "";
      const nextIndex =
        type == "next"
          ? this.selectedEventIndex - 1
          : this.selectedEventIndex + 1;

      console.log(nextIndex);

      if (nextIndex < 0) {
        this.selectedEventIndex = this.historicalEventList.length - 1;
      } else if (nextIndex > this.historicalEventList.length - 1) {
        this.selectedEventIndex = 0;
      } else {
        this.selectedEventIndex = nextIndex;
      }

      console.log(this.selectedEventIndex);
    },
    toggleRandomImg() {
      this.imgToday =
        this.imgList[Math.floor(Math.random() * this.imgList.length)];
    },
    startTyping() {
      const year =
        this.historicalEventList[this.selectedEventIndex]?.year || "";
      const event =
        this.historicalEventList[this.selectedEventIndex]?.event || "";

      let yearIndex = 0;
      let eventIndex = 0;

      if (this.typingInterval) {
        clearInterval(this.typingInterval);
      }

      this.typingInterval = setInterval(() => {
        if (yearIndex < year.length) {
          this.typedYear += year[yearIndex];
          yearIndex++;
        }

        if (eventIndex < event.length) {
          this.typedEvent += event[eventIndex];
          eventIndex++;
        }

        if (yearIndex >= year.length && eventIndex >= event.length) {
          clearInterval(this.typingInterval);
        }
      }, 50);
    },
  },

  watch: {
    selectedEventIndex() {
      this.startTyping();
    },
  },

  mounted() {
    this.toggleRandomImg();
  },
};
</script>
