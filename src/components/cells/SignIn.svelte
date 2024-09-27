<script>
import Button from "../atoms/Button.svelte";
import Input from "../atoms/Input.svelte";
import Loading from "../atoms/Loading.svelte";

import {apiEndpoint} from "../../env.js";
import {userPassPhrase, network} from "../../stores.js";




let passphrase = '';
let res;
let error = '';
let isLoading = false;

const storePassphrase = () => {
    userPassPhrase.set(passphrase);
    console.log('Stored passphrase:', passphrase);
}

$: if ($userPassPhrase) {
    fetchData();
}

const showError = (errorMessage) => {
    error = errorMessage;
    setTimeout(() => {
        error = null;
    }, 2000);
};

async function fetchData() {
    try {
        isLoading = true;
        const response = await fetch(`${apiEndpoint}/me/`, {headers: {'Network-Identifier': $userPassPhrase}});
        if (!response.ok) {
            network.set('')
		        showError(response.statusText)
            throw new Error('Failed to fetch data');
        }
        res = await response.json();
        network.set(res);
    } catch (err) {
        console.log(err)
    } finally {
		    isLoading = false;
    }
}

</script>

<div class="sign-in is-flex">
	{#if (error && $userPassPhrase.length)}
		<div class="input is-danger">{error}</div>
	{/if}
	<Input on:input={(e)=>{passphrase = e.detail}} placeholder="your-super-secret-phrase"/>
	{#if (isLoading)}
		<Loading/>
	{:else}
		<Button on:click={storePassphrase} text="Go"/>
	{/if}
</div>


<style>
	.input {
			margin-right: 5px;
	}
</style>
