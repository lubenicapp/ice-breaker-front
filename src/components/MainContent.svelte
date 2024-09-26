<script>
	import { network } from "../stores";

	import Graph from "./cells/Graph.svelte";
	import AddMember from "./cells/AddMember.svelte";

</script>

<div class="container">
	{#if (!$network.name)}
		{:else }
	<div class="columns">
		<div class="column is-3">
			<AddMember></AddMember>
		</div>
		<div class="column is-8">
			<Graph></Graph>
		</div>
	</div>
	{/if}
</div>


<style>
	.container {
			width: 80%
	}
</style>
