<script>
	import  { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

  export let type = "text"
	export let placeholder = "some text"
	export let style = "width: 350px;"
	export let value = "";

    const handleInput = (event) => {
        value = event.target.value;
        dispatch('input', value);
    }


</script>

<input class="input" {value} {type} {placeholder} {style} on:input={handleInput}>

<style>

</style>
