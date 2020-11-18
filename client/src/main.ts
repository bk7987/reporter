import App from './App.svelte';
import { initializeFirebase } from './firebase';

initializeFirebase();
var app = new App({
  target: document.body,
});

export default app;
