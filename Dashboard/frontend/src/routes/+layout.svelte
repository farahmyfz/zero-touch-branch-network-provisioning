<script>
    import './layout.css'; 

    /** @type {{children: import('svelte').Snippet}} */
    let { children } = $props();
</script>

{@render children()}

<style>
    
</style>