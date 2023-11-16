
<template>
  <div>
    <div>
      <a-button type="primary" @click="showModal">新增</a-button>
      <a-modal v-model:open="open" title="新增乘车人" @ok="handleOk" cancelText="取消" okText="确定">
        <a-form
            ref="formRef"
            :model="passenger"
            :rules="rules"
            :label-col="{span: 4}"
            :wrapper-col="{span: 18}"
        >
          <a-form-item ref="name" label="姓名" name="name">
            <a-input v-model:value="passenger.name" />
          </a-form-item>
          <a-form-item ref="idCard" label="身份证" name="idCard">
            <a-input v-model:value="passenger.idCard" />
          </a-form-item>
          <a-form-item label="类型" name="type">
            <a-select v-model:value="passenger.type" placeholder="请选择购票类型">
              <a-select-option value="1">成人</a-select-option>
              <a-select-option value="2">儿童</a-select-option>
              <a-select-option value="3">学生</a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
      </a-modal>
    </div>

  </div>
</template>
<script>
import {defineComponent, reactive, ref} from 'vue';
import {savePassenger} from "@/API";
import {notification} from "ant-design-vue";

export default defineComponent({
  name: "the-passenger",
  setup() {
    const open = ref(false);
    const rules = {
      name: [
        {
          required: true,
          trigger: 'blur',
          message: '请输入姓名'
        },
        {
          min:3,
          max:8,
          message: '请输入正确的姓名',
          trigger: 'change',
        },
      ],
      type: [
        {
          required: true,
          message: '请选择类型',
          trigger: 'change',
        },
      ],
      idCard:[
        {
          required: true,
          message: '请输入有效的身份证',
          trigger: 'blur',
          pattern:/(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        }
      ]
    };
    const passenger = reactive({
      id:undefined,
      name: '',
      idCard:'',
      type: undefined,
      memberId:undefined,
      createTime:undefined,
      updateTime:undefined,
    });
    const showModal = () => {
      open.value = true;
    };
    const handleOk = () => {
      savePassenger(passenger).then(res=>{
        if (res.data){
          notification.success({description:res.message})
          // 清除本地数据
          passenger.type=undefined;
          passenger.name=''
          passenger.idCard=''
          open.value = false;
        }else{
          notification.error({description:'新增乘客异常'})
        }
      })
    };
    return {
      showModal,
      handleOk,
      open,
      passenger,
      rules
    };
  },
})

</script>

<style scoped>

</style>
