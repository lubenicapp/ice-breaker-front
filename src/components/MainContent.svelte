<script>
	import { network } from "../stores";

	import Graph from "./cells/Graph.svelte";

</script>

<div class="container">
	{#if (!$network.name)}
		Nothing
		{:else }
	<div class="columns">
		<div class="column is-3">
			<label class="label" for="">Add a member with a linkedin url</label>
			<input class="input" type="text" placeholder="https://www.linkedin.com/in/joe-letaxi">
		</div>
		<div class="column is-6">
			<Graph></Graph>
		</div>
	</div>
	{/if}
</div>


<style>
	.container {
			width: 80%
	}

	.input {
			margin-left: -12px;
	}

</style>
