<template>
  <div class="integration-form">
    <div class="header">
      <h2>Add New Integration</h2>
      <button class="close-button" @click="handleCloseForm">X</button>
    </div>
    <form @submit.prevent="handleSave">
      <div class="form-group">
        <label for="type">Type</label>
        <select v-model="form.type" id="type" required>
          <option value="">Select Type</option>
          <option value="Discord">Discord</option>
        </select>
        <span v-if="errors.type" class="error">{{ errors.type }}</span>
      </div>

      <div class="form-group">
        <label for="friendlyName">Friendly Name *</label>
        <input type="text" id="friendlyName" v-model="form.friendlyName" required />
        <span v-if="errors.friendlyName" class="error">{{ errors.friendlyName }}</span>
      </div>

      <div class="form-group">
        <label for="webhookURL">Webhook URL *</label>
        <input type="text" id="webhookURL" v-model="form.webhookURL" required />
        <span v-if="errors.webhookURL" class="error">{{ errors.webhookURL }}</span>
      </div>

      <div class="form-group">
        <label for="botDisplayName">Bot Display Name</label>
        <input type="text" id="botDisplayName" v-model="form.botDisplayName" />
      </div>

      <div class="form-actions">
        <button type="button" @click="handleSendTest">Send Test</button>
        <button type="submit">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from '../axios.js';

export default {
  setup() {
    const form = ref({
      type: '',
      friendlyName: '',
      webhookURL: '',
      botDisplayName: '',
    });

    const errors = ref({
      type: '',
      friendlyName: '',
      webhookURL: '',
    });

    const isValidUrl = (url) => {
      const urlPattern = new RegExp('^(https?:\\/\\/)?'+ 
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
        '((\\d{1,3}\\.){3}\\d{1,3}))'+
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
        '(\\#[-a-z\\d_]*)?$','i'); 
      return !!urlPattern.test(url);
    };

    const validateForm = () => {
      const [type, friendlyName, webhookURL] = [
        form.value.type?.trim(), 
        form.value.friendlyName?.trim(), 
        form.value.webhookURL?.trim(),
      ];
      const isValidWebhookWebhookUrl = isValidUrl(webhookURL);

      errors.value.type = type !== 'Discord' ? 'Type is required and must be Discord' : '';
      errors.value.friendlyName = !friendlyName ? 'Friendly Name is required' : '';
      errors.value.webhookURL = !webhookURL ? 
        'Webhook URL is required' : !isValidWebhookWebhookUrl ? 
          'Webhook URL must be a valid url' : '';

      return !Object.values(errors.value).find(Boolean);
    };

    const handleSave = async () => {
      if (!validateForm()) {
        return;
      }

      const response = await axios.post('/api/save');
      console.log(response?.data)
    };

    const handleSendTest = async () => {
      if (!validateForm()) {
        return;
      }

      const response = await axios.post('/api/send-test');
      console.log(response?.data)
    };

    const handleCloseForm = () => {
      console.log('Form closed')
    };

    return { form, errors, handleSave, handleSendTest, handleCloseForm };
  },
};
</script>

<style scoped>
.integration-form {
  max-width: 400px;
  margin: 0 auto;
  position: relative;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: white;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
}

.form-actions {
  display: flex;
  justify-content: space-between;
}

button {
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.error {
  color: red;
  font-size: 0.875rem;
}
</style>