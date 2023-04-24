<!--
	This is the forum page, it uses the dashboard layout in:
	"./layouts/Dashboard.vue" .
 -->

 <template>
    <div class="forum">
      <h1>Your Building Message Board</h1>
  
      <a-row  :gutter="24" type="flex">
			<a-col  :span="24" class="mb-24">
				<!-- Forum actions Card -->
				<CardForumActions></CardForumActions>
				<!-- Forum actions Card -->

			</a-col>

		</a-row>
  
      <!-- Display threads using the ThreadCard component -->
      <div class="thread-list">
        <CardForumThread
          v-for="(thread, index) in topicsData"
          :key="index"
          :thread="thread"
        ></CardForumThread>
      </div>
    </div>
  </template>
  
  <script>
  import CardForumActions from "../components/Cards/CardForumActions.vue";
  import CardForumThread from "../components/Cards/CardForumThread.vue";
	import { mapActions } from 'vuex'
	import { mapState } from 'vuex'
  
  export default {
    components: {
        CardForumActions,
        CardForumThread,
    },
    data() {
      return {
        
      };
    },
		async mounted() {
			window.analytics.page('Forum');
			await this.getTopics();
		},
		computed: {
			...mapState({
				topicsData: state => state.forum.topics,
			})
		},
		
    methods: {
			...mapActions({
				getTopics: 'forum/getTopics',

			}),
    },
  };
  </script>
  
  