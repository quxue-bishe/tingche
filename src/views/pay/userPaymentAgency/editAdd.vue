<template>
  <div class="container">
    <a-modal
      v-model:visible="visible"
      :width="1200"
      draggable
      :footer="false"
      @close="resetFields"
    >
      <template #title>
        {{ formData?.id ? '编辑收款账号' : '新增收款账号' }}
      </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> 必填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item
                  label="币种"
                  field="currencyType"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.currencyType"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="机构名称"
                  field="name"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.name"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="支付key"
                  field="payKey"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.payKey"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="支付机构"
                  field="paymentAgencyShortName"
                  validate-trigger="input"
                  required
                >
                <a-select
                    v-model="formData.paymentAgencyShortName"
                    :style="{ width: '320px' }"
                    :loading="loading"
                    placeholder="请输入"
                    allow-search
                    :filter-option="false"
                    @search="handleSearch"
                  >
                    <a-option
                      v-for="item of paymentAgencyList"
                      :key="item?.id"
                      :value="item?.paymentAgencyName"
                      >{{ item.name }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="使用场景" field="useScenes" required>
                  <a-select
                    v-model="formData.useScenes"
                    placeholder="请选择"
                    allow-clear
                    @change="useSceneChange"
                  >
                    <a-option value="wx_web">微信公众号</a-option>
                    <a-option value="wx_mp">微信小程序</a-option>
                    <a-option value="wx_app">微信app</a-option>
                    <a-option value="ali_web">阿里公众号</a-option>
                    <a-option value="ali_mp">阿里小程序</a-option>
                    <a-option value="ali_app">阿里app</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="支付secret"
                  field="secret"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.secret"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="应用id" field="appid" required>
                  <a-input
                    v-model="formData.appid"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="商户号" field="mchId" required>
                  <a-input
                    v-model="formData.mchId"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="支付通知地址" field="payNotifyUrl" required>
                  <a-input
                    v-model="formData.payNotifyUrl"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="支付退款通知地址"
                  field="refundPayNotifyUrl"
                  required
                >
                  <a-input
                    v-model="formData.refundPayNotifyUrl"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>
          <a-card class="general-card">
            <template #title> 选填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item label="第三方聚合支付平台" field="aggregatePaymentPlatform">
                  <a-select
                    v-model="formData.aggregatePaymentPlatform"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option value="fu_you">富友支付</a-option>
                    <a-option value="yi_sheng">易生支付</a-option>
                    <a-option value="duo_la_bao">哆啦宝支付</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="账号备注" field="accountNumberNote">
                  <a-input
                    v-model="formData.accountNumberNote"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="授权token" field="authToken">
                  <a-input
                    v-model="formData.authToken"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="证书路径" field="certPath">
                  <a-input
                    v-model="formData.certPath"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
            
             
              <a-col :span="8">
                <a-form-item label="子商户appid" field="subAppid">
                  <a-input
                    v-model="formData.subAppid"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="子商户号" field="subMchId">
                  <a-input
                    v-model="formData.subMchId"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="终端号" field="terminalNumber">
                  <a-input
                    v-model="formData.terminalNumber"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="证书序列号" field="merchantSerialNumber">
                  <a-input
                    v-model="formData.merchantSerialNumber"
                    placeholder="微信支付专用"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="商户私钥" field="merchantPrivateKey">
                  <a-input
                    v-model="formData.merchantPrivateKey"
                    placeholder="微信支付专用(apiclient_key.pem)"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="商户证书" field="merchantCertificate">
                  <a-input
                    v-model="formData.merchantCertificate"
                    placeholder="微信支付专用(apiclient_cert.pem)"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              
              <!-- <a-col :span="8">
                <a-form-item label="所属用户" field="uid">
                  <a-select
                    v-model="formData.uid"
                    :style="{ width: '320px' }"
                    :loading="loading"
                    placeholder="请输入"
                    allow-search
                    :filter-option="false"
                    @search="handleSearch"
                  >
                    <a-option
                      v-for="item of userList"
                      :key="item?.id"
                      :value="item?.id"
                      >{{ item.userName }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col> -->
            </a-row>
          </a-card>
        </a-space>
        <div class="actions">
          <a-space>
            <a-button @click="resetFields"> 重置 </a-button>
            <a-button type="primary" :loading="loading" @click="onSubmitClick">
              保存
            </a-button>
          </a-space>
        </div>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { cfUserGetListByQuery } from '@/api/user';
  import { cfPaymentAgencyAdd, cfPaymentAgencyUpdate, getPaymentAgencyListByQuery } from '@/api/pay';
  import { Message } from '@arco-design/web-vue';

  const visible = ref(false);
  const loading = ref(false);
  const userList = ref([]);
  const formRef = ref();
  const emit = defineEmits(['fetchData', 'fetch-data']);
  const formData = ref({
    accountNumberNote: '',
    appid: '',
    authToken: '',
    certPath: '',
    currencyType: 'cny',
    mchId: '',
    name: '',
    payKey: '',
    payNotifyUrl: '',
    paymentAgencyShortName: '',
    refundPayNotifyUrl: '',
    secret: '',
    subAppid: '',
    subMchId: '',
    uid: 0,
    useScenes: '',
    id: '',
    aggregatePaymentPlatform: '',
    terminalNumber: '',
    merchantSerialNumber: '',
    merchantPrivateKey: '',
    merchantCertificate: '',
  });
  const paymentAgencyList = ref([]);
  
  const useSceneChange = (e: any) => {
    if(e === 'wx_web' || e === 'wx_mp' || e === 'wx_app'){
      formData.value.payNotifyUrl = "http://v3.cfeng.wang/pay/cfOrder/wxinPayNotify"
      formData.value.refundPayNotifyUrl = "http://v3.cfeng.wang/pay/cfOrder/wxinPayNotify"
    }else if(e === 'ali_web' || e === 'ali_mp' || e === 'ali_app'){
      formData.value.payNotifyUrl = "https://v3.cfeng.wang/pay/cfOrder/aliPayNotify"
      formData.value.refundPayNotifyUrl = "https://v3.cfeng.wang/pay/cfOrder/aliPayNotify"
    }
  };
  const handleSearch = async (value: any) => {
    const { data, code } = await cfUserGetListByQuery({
      params: {
        userName: value,
        page: 1,
        size: 20,
      },
    });
    if (code === 10002) {
      userList.value = data;
    }
  };
  const getPaymentAgencyList = async () => {
    const { code, data } = await getPaymentAgencyListByQuery({
      params:{
        page: 1,
        size: 200,
      }
    })
    console.log(code,data);
    if(code === 10002){
      paymentAgencyList.value = data
    }else{
      paymentAgencyList.value = []
    }
  }
  const handleClick = (e: any = null) => {
    getPaymentAgencyList()
    if (e?.id) {
      const newInfo = JSON.parse(JSON.stringify(e));
      formData.value = newInfo;
    }
    visible.value = true;
  };
  const resetFields = () => {
    formData.value.id = '';
    formRef.value.resetFields();
  };
  const onSubmitClick = () => {
    // eslint-disable-next-line consistent-return
    formRef.value.validate(async (valid: any) => {
      if (valid) return false;
      // @ts-ignore
      if (formData.value.id) {
        const { code } = await cfPaymentAgencyUpdate(formData.value);
        if (code === 10002) {
          formRef.value.resetFields();
          visible.value = false;
          Message.success('更新成功!');
          emit('fetchData');
        }
      } else {
        const { code } = await cfPaymentAgencyAdd(formData.value);
        if (code === 10002) {
          formRef.value.resetFields();
          visible.value = false;
          Message.success('添加成功!');
          emit('fetchData');
        }
      }
    });
  };

  defineExpose({ handleClick });
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 40px 20px;
    overflow: hidden;
  }

  .actions {
    height: 60px;
    padding: 14px 20px 14px 0;
    background: var(--color-bg-2);
    text-align: right;
  }
</style>
