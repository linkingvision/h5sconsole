<template>
<div>
</div>
</template>

<script>
import * as types from '@/store/types'
export default {
    name: 'logout',
    mounted() {
        console.log("logout");
        this.$store.commit(types.LOGOUT);
        this.$router.push({
            path: '/login'
        });
    }
}
</script>

