<!--
	This component is used to display the widgets in the dashboard.

 -->

<template>
    <div>
    <a-col :span="24" :lg="12" :xl="6" class="mb-24" v-for="(stat, index) in stats" :key="index">
				<!-- Widget 1 Card -->
				<WidgetCounter
					:title="stat.title"
					:value="stat.value"
					:prefix="stat.prefix"
					:suffix="stat.suffix"
					:icon="stat.icon"
					:status="stat.status"
				></WidgetCounter>
				<!-- / Widget 1 Card -->
    </a-col>
</div>

</template>


<script>
import WidgetCounter from '../Widgets/WidgetCounter' ;

export default {
    name: 'CardDashboardWidgets',
    components: {
        WidgetCounter
    },
    props: {
        stats: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
        }
    },
}
</script>