<script>
import Button from "../atoms/Button.svelte";
import Input from "../atoms/Input.svelte";

import {apiEndpoint} from "../../env.js";
import {userPassPhrase, network} from "../../stores.js";


let passphrase = '';
let res;

const storePassphrase = () => {
    userPassPhrase.set(passphrase);
    console.log('Stored passphrase:', passphrase);
}

$: if ($userPassPhrase) {
    fetchData();
}

async function fetchData() {
    try {
        const response = await fetch(`${apiEndpoint}/me/`, {headers: {'Network-Identifier': $userPassPhrase}});
        if (!response.ok) {
            network.set('')
            throw new Error('Failed to fetch data');
        }
        res = await response.json();
        network.set(res);
    } catch (err) {
        console.log(err)
    }
}

</script>

<div class="sign-in">
	<Input on:input={(e)=>{passphrase = e.detail}} placeholder="your-super-secret-phrase"/>
	<Button on:click={storePassphrase} text="Go"/>
</div>


<style>

</style>
