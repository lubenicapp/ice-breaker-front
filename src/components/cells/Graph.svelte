<script>
    import { onMount } from 'svelte';
    import { network, userPassPhrase, memberAdded } from "../../stores.js";

    import ForceGraph3D from '3d-force-graph';
    import * as THREE from 'three';
    import { apiEndpoint } from "../../env.js";

    let graphContainer; // Reference for the graph DOM element
    let gData = { nodes: [], links: [] }; // Placeholder for graph data
    let graph; // Keep track of the ForceGraph instance

    // Watch for changes to the network store and fetch data
    $: if ($network || $memberAdded) {
        fetchData();
    }

    async function fetchData() {
        try {
            const response = await fetch(`${apiEndpoint}/graph/`, {
                headers: { 'Network-Identifier': $userPassPhrase }
            });
            if (!response.ok) {
                network.set('');
                throw new Error('Failed to fetch data');
            }
            gData = await response.json();
            loadGraph(); // Load graph after data is fetched
        } catch (err) {
            console.log(err);
        }
    }

    // Initialize the 3D graph when the component mounts
    onMount(() => {
        if (gData.nodes.length > 0) {
            loadGraph(); // Initial load if gData is available
        }
    });

    function loadGraph() {
        if (!graph) {
            graph = ForceGraph3D()(graphContainer) // Use the reference
                .nodeThreeObject(({ img, name }) => {
                    const group = new THREE.Group();

                    // Load image texture
                    const imgTexture = new THREE.TextureLoader().load(img);
                    imgTexture.colorSpace = THREE.SRGBColorSpace;
                    const material = new THREE.SpriteMaterial({ map: imgTexture });
                    const sprite = new THREE.Sprite(material);
                    sprite.scale.set(24, 24); // Scale the image

                    // Add sprite to the group
                    group.add(sprite);

                    // Create text label as a texture
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    context.font = '40px Arial';
                    context.fillStyle = '#069100';
                    context.fillText(name, 0, 50);

                    // Create texture from the canvas
                    const textTexture = new THREE.CanvasTexture(canvas);
                    const textMaterial = new THREE.SpriteMaterial({ map: textTexture });
                    const textSprite = new THREE.Sprite(textMaterial);
                    textSprite.scale.set(50, 15);
                    textSprite.position.set(0, -15, 0);

                    group.add(textSprite);

                    return group;
                })
                .graphData(gData)
                .width(graphContainer.clientWidth)
                .height(graphContainer.clientHeight)
                .d3Force('link').distance(50)
                .d3Force('charge').strength(0)
                .linkWidth(100)
                .linkColor(() => 'green');
        } else {
            graph.graphData(gData);
        }

        // Handle resizing
        window.addEventListener('resize', () => {
            graph.width(graphContainer.clientWidth);
            graph.height(graphContainer.clientHeight);
        });
    }
</script>

<!-- Container for the 3D graph -->
<div class="board">
	<div class="graph-container" bind:this={graphContainer}></div>
</div>

<style>
    .board {
        background: #010205;
        width: 100%;
        aspect-ratio: 1 / 1;
        border: #0278aa 4px solid;
        border-radius: 2px;
        position: relative;
        overflow: hidden; /* Prevent overflow of child elements */
    }

    .graph-container {
        width: 100%;
        height: 100%;
        position: absolute; /* Make sure it fills the parent */
        top: 0;
        left: 0;
    }
</style>
