<script>
	import {get} from "svelte/store";
  import {network} from "../stores.js";
  import SignIn from "./cells/SignIn.svelte";
	import SignOut from "./cells/SignOut.svelte";

	let title = ''

	network.subscribe(() => {
        if ($network && get(network).name)
            title = `${get(network).name} Network`
				else
          title = ''
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
			{#if (!$network || !$network.name)}
				<SignIn/>
			{:else}
				<SignOut/>
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
