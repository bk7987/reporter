<script lang="ts">
  import { defaultUser, setAuthStateListener } from "./firebase";
  import type { User } from "./types";
  import Login from "./Login.svelte";

  let currentUser: User = defaultUser;
  setAuthStateListener((user) => {
    currentUser = user;
  });
</script>

{#if currentUser.loggedIn}
  <h1>Welcome, {currentUser.email}!</h1>
  <p>{currentUser.token}</p>
{:else}
  <Login />
{/if}
