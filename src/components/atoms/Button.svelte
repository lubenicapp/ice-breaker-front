<script>
  import  { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

	export let text = "click me"

  const handleClick = () => {
      dispatch('click')
  }

</script>

<button class="button" on:click={handleClick}>
	{text}
</button>

<style>
	button {
			margin-left: 10px;
	}
</style>
