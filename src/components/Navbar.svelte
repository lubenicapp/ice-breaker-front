<script>
	import {get} from "svelte/store";
  import {email} from "../stores.js";
  import SignIn from "./cells/SignIn.svelte";

	let title = 'nav'

	email.subscribe(() => {
        if (get(email))
          title = `Hello ${get(email)}`
				else
          title = 'nav'
	})

</script>

<div class="block">
	<div class="container is-flex is-align-items-center is-justify-content-space-between">
		<div class="logo">
			<h1 class="title is-4">
				{title}
			</h1>
		</div>
		<div class="">
			<SignIn/>
		</div>
	</div>
</div>


<style>
	.block {
			padding-top: 10px;
			padding-bottom: 10px;
			border-bottom: cadetblue solid 1px;
	}
</style>
