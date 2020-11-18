<script lang="ts">
  import { login } from "./firebase";

  let loginData = {
    email: "",
    password: "",
  };

  async function onSubmitLogin() {
    const error = await login(loginData.email, loginData.password);
    if (error) {
      console.log(error);
    }
    loginData = { email: "", password: "" };
  }
</script>

<h2>Login</h2>
<form on:submit|preventDefault={onSubmitLogin}>
  <div>
    <label for="email">Email:</label>
    <input type="text" placeholder="Email" bind:value={loginData.email} />
  </div>
  <div>
    <label for="password">Password:</label>
    <input type="password" name="password" bind:value={loginData.password} />
  </div>

  <button type="submit">Login</button>
</form>
