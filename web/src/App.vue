<template>
  <NavBar/>
  <router-view/>
</template>
<script>
import NavBar from '@/components/NavBar.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"
export default {
  components :{
    NavBar
  },
  setup() {
    

    // $.ajax({
    //   url: "http://127.0.0.1:3000/user/account/info/",
    //   type:"GET",
    //   headers: {
    //     Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJlMWUwNWUzYzlhZDc0MmNjYmMxZmM3OGRmYjdhY2VhZiIsInN1YiI6IjIiLCJpc3MiOiJzZyIsImlhdCI6MTcyOTM5MDUzNywiZXhwIjoxNzMwNjAwMTM3fQ.GP-w8_muncp1jIJrQgK475FM9l8bEKXGkdOolyc3eas"
    //   },
    //   success(resp) {
    //     console.log(resp);
    //   },
    //   error(resp) {
    //     console.log(resp);
    //   }
    // });

    // $.ajax({
    //   url: "http://127.0.0.1:3000/user/account/register/",
    //   type:"POST",
    //   data: {
    //     username: "i",
    //     password: "123",
    //     confirmedPassword: "123"
    //   },
    //   success(resp) {
    //     console.log(resp);
    //   },
    //   error(resp) {
    //     console.log(resp);
    //   }
    // })

  }
}
</script>
<style>
body {
  background-image:url("@/assets/images/background.png");
  background-size:100% 100%;
  background-attachment:fixed;
}
</style>
