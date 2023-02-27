<template>

	<!-- Building Information Card -->
	<a-card :bordered="false" class="header-solid h-full card-profile-information" :bodyStyle="{paddingTop: 0, paddingBottom: '16px' }" :headStyle="{paddingRight: 0,}">
		<template #title>
			<h6 class="font-semibold m-0">Building Information</h6>
		</template>
		<a-button type="link" slot="extra">
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path class="fill-muted" d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z" fill="#111827"/>
				<path class="fill-muted" d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z" fill="#111827"/>
			</svg>
		</a-button>
		<p class="text-dark">
			Hi, this is your building page. Here you can find information about the building and the owners.
		</p>
		<hr class="my-25">
		<a-descriptions  :column="1">
			<a-descriptions-item label="Full Address">
				{{buildingInfo.address}}
			</a-descriptions-item>
			<a-descriptions-item label="Number of Apartments">
				{{buildingInfo.apartments}}
			</a-descriptions-item>
			<a-descriptions-item label="Board President">
				{{buildingInfo.board_president}}
			</a-descriptions-item>
			<a-descriptions-item label="Treasurer">
				{{buildingInfo.treasurer}}
			</a-descriptions-item>
			<a-descriptions-item label="Main Email">
				{{buildingInfo.email}}
			</a-descriptions-item>
			<a-descriptions-item label="Tax ID">
				{{buildingInfo.tax_id}}
			</a-descriptions-item>
			<a-descriptions-item label="Budget 2023">
				{{buildingInfo.budget}}
			</a-descriptions-item>
		</a-descriptions>
	</a-card>
	<!-- / Profile Information Card -->

</template>

<script>

	export default ({
		props: {
			buildingInfo: {
				type: Object,
				default: () => {},
			},
		},
		data() {
			return {
			}
		},
	})

</script>