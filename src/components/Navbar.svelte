<script>
	import {get} from "svelte/store";
  import {network} from "../stores.js";
  import SignIn from "./cells/SignIn.svelte";

	let title = 'nav'

	network.subscribe(() => {
        if ($network)
          title = `${get(network).name} Network`
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
			{#if (!$network.name)}
				<SignIn/>
			{/if}
		</div>
	</div>
</div>


<style>
	.block {
			padding-top: 10px;
			padding-bottom: 10px;
			border-bottom: #0278aa solid 4px;
	}
</style>
