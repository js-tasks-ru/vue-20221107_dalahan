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
      meetup: null,
    };
  },
  watch: {
    meetupId() {
      this.getMeetup();
    },
  },
  mounted() {
    this.getMeetup();
  },

  methods: {
    getMeetup() {
      this.meetup = null;
      fetchMeetupById(this.meetupId)
        .then((result) => {
          this.meetup = result;
        })
        .catch((error) => {
          this.meetup = { error };
        });
    },
  },

  template: `
    <div class="page-meetup">

      <UiContainer v-if="!meetup" >
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>

      <UiContainer v-else-if="meetup.error" >
        <UiAlert>{{ meetup.error.message }}</UiAlert>
      </UiContainer>

      <MeetupView v-else :meetup="meetup" />

    </div>`,
});
