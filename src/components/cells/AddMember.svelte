<script>
		import {createEventDispatcher} from "svelte";

		import { get } from "svelte/store";
		import {apiEndpoint} from "../../env.js";
		import {userPassPhrase, memberAdded} from "../../stores.js";

    let value = '';
		let success = false;
    let isLoading = false;
		let error = '';

    const showSuccess = () => {
        success = true;
        setTimeout(() => {
            success = false;
        }, 4000);
    };

    const showError = (errorMessage) => {
        error = errorMessage;
        setTimeout(() => {
            error = null;
        }, 4000);
    };

    const handleKeyPress = async (event) => {
        if (event.key === 'Enter') {
            console.log('Enter', value);

            isLoading = true;

            try {
                // Send POST request
                const response = await fetch(`${apiEndpoint}/persons/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Network-Identifier': get(userPassPhrase)},
                    body: JSON.stringify({ linkedin_identifier: value })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    error = errorData.error || response.statusText;
                    showError(error)
                    throw new Error(error);
                }

                value = '';
		            showSuccess()
                memberAdded.update(n => n + 1);
                console.log('Member added successfully!');
            } catch (error) {
                console.error('Error:', error);
            } finally {
                isLoading = false;
            }
        }
    };
</script>

<label class="label" for="">Add a member with a LinkedIn URL</label>
<input
	class="input"
	type="text"
	placeholder="https://www.linkedin.com/in/joe-letaxi"
	bind:value
	on:keypress={handleKeyPress}
/>

{#if isLoading}
	<div class="loading-icon"></div>
{:else if error}
	<div class="notification is-danger is-light">
		{error}
	</div>
{:else if success}
	<div class="notification is-success is-light">
		Entity created
	</div>
{/if}

<style>
    .input, .notification {
        margin-left: -12px;
    }

    .notification {
		    margin-top: 15px;
    }

    .loading-icon {
        border: 4px solid rgba(0, 0, 0, 0.1);
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border-left-color: #09f;
        animation: spin 1s linear infinite;
        margin-top: 10px;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
