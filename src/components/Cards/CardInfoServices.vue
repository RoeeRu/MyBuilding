<template>

	<a-card :bordered="false" class="card-info">
		<a-row type="flex">
			<a-col class="col-content" :span="24" :xl="12">
				<div class="card-content">
					<h6>{{details.above_title}}</h6>
					<h5>{{ details.title }}</h5>
					<p>{{ details.description }}</p>
				</div>
				<div class="card-footer">
					<a-button slot="actions" type="link" @click="sendEmail(details.email_body, buildingInfo.address, userInfo.name)">				
						<span>{{ details.action }}</span>
						<svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M7.29289 14.7071C6.90237 14.3166 6.90237 13.6834 7.29289 13.2929L10.5858 10L7.29289 6.70711C6.90237 6.31658 6.90237 5.68342 7.29289 5.29289C7.68342 4.90237 8.31658 4.90237 8.70711 5.29289L12.7071 9.29289C13.0976 9.68342 13.0976 10.3166 12.7071 10.7071L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071Z" fill="#111827"/>
						</svg>
				</a-button>
				</div>
			</a-col>
			<a-col class="col-img" :span="24" :xl="12">
				<div class="card-img-bg">
					<img :src="details.image_url" alt="">
				</div>
			</a-col>
		</a-row>
	</a-card>

</template>

<script>

	export default ({
		props: {
			details: {
				type: Object,
				default: () => {
					return {
						above_title: "",
						title: "Title",
						description: "Long text about the service",
						image_url: "https://via.placeholder.com/600x400.png?text=Image",
						action: "Learn More",
						email_body: "Hello"
					}
				}
			},
			buildingInfo: {
				type: Object,
				default: () => {
					return {
						name: "Building Name",
						address: "Building Address",
					}
				}
			},
			userInfo: {
				type: Object,
				default: () => {
					return {
						name: "User Name",
						email: "Email",
					}
				}
			},
		},
			
		data() {
			return {
			}
		},
		methods: {
			sendEmail(email_body, address, name) {
				console.log('send invite')
				var formattedBody = email_body+"\n"+name+"\n"+address;
				var formattedSubject = "Join Your Building Page @ Domos";
				window.open("mailto:hello@joindomos.com?subject="+encodeURIComponent(formattedSubject)+"&body="+encodeURIComponent(formattedBody), '_blank').focus();
			}
		}
	})

</script>