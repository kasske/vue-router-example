<template>
  <button @click="confirmInput">Confirm</button>
  <button @click="saveChanges">Save changes</button>
  <ul>
    <user-item
      v-for="user in users"
      :key="user.id"
      :name="user.fullName"
      :role="user.role"
    ></user-item>
  </ul>
</template>

<script>
import UserItem from '../components/users/UserItem.vue';

export default {
  components: {
    UserItem,
  },
  inject: ['users'],
  data() {
    return {
      changesSaved: false,
    };
  },
  methods: {
    saveChanges() {
      this.saveChanges = true;
    },
    confirmInput() {
      this.$router.push('/teams');
    },
  },
  beforeRouteEnter(to, from, next) {
    console.log('UsersList component beforeRouteEnter');
    console.log(to, from);
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log('UsersList component beforeRouteLeave');
    console.log(to, from);

    if (this.changesSaved) {
      next();
    } else {
      //either true or false
      const userWantsToLeave = confirm(
        'Are you sure? You got unsaved changes!'
      );
      next(userWantsToLeave);
    }
  },
  unmounted() {
    //can't cancel the navigation from here
    console.log('unmounted');
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>
