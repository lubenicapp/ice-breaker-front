<script>
import Button from "../atoms/Button.svelte";
import {userPassPhrase, network} from "../../stores.js";

const signOut = () => {
    userPassPhrase.set(null);
    network.set(null);
}

</script>

<div class="sign-in">
	<Button on:click={signOut} text="Sign Out" />
</div>


<style>

</style>
