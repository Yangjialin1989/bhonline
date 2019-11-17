<template>
  <div class="email">
    <form>
      <div class="input">
        <label for="name" class='label'>姓名</label>
        <input type="text" name="name" v-model.trim="formData.name" id="name" class="value">
      </div>
      <div class="input">
        <label for="name" class='label'>电话</label>
        <input type="text" name="phone" v-model.trim="formData.phone" id="phone" class="value">
      </div>
      <button class="send" type="submit" @click.stop.prevent="send(formData)">发送邮件</button>
    </form>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'Email',
  data() {
    return {
      formData: {
        name: '',
        phone: '',
      },
    };
  },
  methods: {
    send(data) {
      if (!data.name) {
        alert('请输入的你的姓名');
        return false;
      } else if (!data.phone) {
        alert('请输入的你的电话');
        return false;
      } else {
        axios({
          method: 'post',
          url: '/api/email',  // 后面会讲解
          data: data,
        });
      }
    },
  },
};
</script>
<style scoped>
.input {
  display: flex; }
  .label {
    width: 0.3rem;
  }
 
  .value {
    flex: 1;
    border: 1px solid #dfdfdf;
  }

</style>
