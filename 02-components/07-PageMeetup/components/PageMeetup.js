import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from '../meetupService.js';
import MeetupView from './MeetupView';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
      default: 0,
    },
  },

  data() {
    return {
      meetup: {},
      savId: 0,
    };
  },
  updated() {
    this.getMeetup();
  },
  mounted() {
    this.getMeetup();
  },

  methods: {
    getMeetup() {
      if (this.savId != this.meetupId) {
        this.savId = this.meetupId;   // защита от множественного срабатывания
        this.meetup = {};             // обнуляю только ради прохождения 5го автотеста :( 
        fetchMeetupById(this.meetupId)
          .then((result) => {
            this.meetup = result;
          })
          .catch((error) => {
            this.meetup = { error };
          });
      }
    },
  },

  template: `
    <div class="page-meetup">
      <MeetupView v-if="meetup.id" :meetup="meetup" />

      <UiContainer v-else-if="!meetup.error" >
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>

      <UiContainer v-else >
        <UiAlert>{{ meetup.error.message }}</UiAlert>
      </UiContainer>

    </div>`,
});
