<template>

<a-card :bordered="false" class="header-solid h-full mb-24" :bodyStyle="{paddingTop: '2px'}">
					<template #title>
						<h4 class="font-semibold">Open Tasks</h4>
						<p class="text-xs text-gray-500">Action items and maintenance requests that are still open</p>
					</template>
					<a-row type="flex" :gutter="[48,24]" align="top">

						<!-- Project Column -->
						<a-col :span="24" :md="12" :lg="24" :xl="6" v-for="(project, index) in projects" :key="index">
							<!-- Project Card -->
								<a-card class="card-project">
								<div class="card-tag">Item #{{ project.id }} </div>
								<br>
								<h5 >{{ project.title }}</h5>
								<p>
									{{ project.content }}
								</p>
							<a-row type="flex" :gutter="12" class="card-footer" align="middle">
								<a-col :span="12" >
									<div v-if="project.link === '/actions'" class="team">
										<a-button @click="$router.push('/actions')" size="small"> {{ project.button }}</a-button>
									</div>
									<div v-else-if="project.link === '/maintenance'" class="team">
										<a-button @click="$router.push('/maintenance')" size="small"> {{ project.button }}</a-button>
									</div>
								</a-col>

							</a-row>
							</a-card>
							<!-- / Project Card -->
						</a-col>
						<!-- / Project Column -->

					</a-row>
				</a-card>

	

</template>

<script>

	export default ({
		props: {
			projects: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
			}
		},
	})

</script>
