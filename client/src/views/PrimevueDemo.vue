<template>
  <div class="shadow-md border rounded-lg p-8 w-full lg:max-w-lg">
    <div class="text-center mb-5">
      <div class="font-black text-primary text-3xl mb-3">Primevue demo</div>
      <span>Don't have an account?</span>
      <a class="no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a>
    </div>

    <div>
      <label for="email1" class="block font-black mb-2">Email</label>
      <InputText id="email1" type="text" class="w-full mb-3" />

      <label for="password1" class="block font-black mb-2">Password</label>
      <InputText id="password1" type="password" class="w-full mb-3" />

      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center">
          <Checkbox id="rememberme1" :binary="true" v-model="checked" class="mr-2"></Checkbox>
          <label for="rememberme1">Remember me</label>
        </div>
        <a class="no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot password?</a>
      </div>

      <Button label="Sign In" icon="pi pi-user" class="w-full"></Button>
    </div>
  </div>
</template>

<script setup>
let checked = false
</script>
