<template>
  <div class="container">
    <a-modal v-model:visible="visible" :width="1400" draggable :footer="false" @close="resetFields">
      <template #title> {{ modalTitle }} - 停车收入报表 </template>
      <a-row>
        <a-col :flex="1">
          <a-form :model="formModel" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }" label-align="left">
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item
                  label="日期"
                  field="startTime"
                  validate-trigger="input"
                  required
                >
                  <a-date-picker
                    format="YYYY-MM-DD"
                    v-model="formModel.currentDay"
                    @change="getList"
                    :allow-clear="false"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="业务类型" field="status">
                  <a-select
                    v-model="formModel.goodsType"
                    placeholder="请选择"
                    @change="getList"
                  >
                    <a-option :value="1">临停缴费</a-option>
                    <a-option :value="5">停车套餐</a-option>
                    <a-option :value="6">车位预订</a-option>
                    <a-option :value="14">停车储值卡充值</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 40px" direction="vertical" />
        <!-- <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="getList">
              <template #icon>
                <icon-search />
              </template>
              查询
            </a-button>
          </a-space>
        </a-col> -->
      </a-row>
      <a-table @page-change="pageChange" row-key="id" :pageSize="20" :pagination=pagination :columns="columns" :data="list" :style="{ height: '700px' }" :loading="loading">
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
      </a-table>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { cloneDeep } from 'lodash';
import { getDailyIncomeStatisticsListByQuery } from '@/api/visualization';
import dayjs from 'dayjs';
import { getPaymentAgencyListByQuery } from '@/api/pay';
// import JsonEditorVue from 'json-editor-vue3';

// @ts-ignore
const pagination = reactive({
    current: 1,
    pageSize: 20,
    total: 0,
  });
const visible = ref(false);
const list = ref([]);
const loading = ref(false);
const modalTitle = ref('');
const formRef = ref();
const emit = defineEmits(['fetchData', 'fetch-data']);
const generateFormModel = () => {
  return {
    currentDay: dayjs().format('YYYY-MM-DD'),
    goodsType: 1
  };
};
const pageChange = (e: number) => {
    pagination.current = e;
    getList();
  };
const formModel = ref(generateFormModel());
const paymentAgencyList = ref([]);
const columns = [
  {
    title: '支付方式',
    dataIndex: 'paymentAgencyShortNameTitle',
  },
  {
    title: '应付金额',
    dataIndex: 'amountsPayable',
  },
  {
    title: '实付金额',
    dataIndex: 'amountActuallyPaid',
  },
  {
    title: '退款金额',
    dataIndex: 'refundAmount',
  },
  {
    title: '支付笔数',
    dataIndex: 'payCounts',
  },
];
const shopId = ref('');
const handleClick = (e: any = null) => {
  shopId.value = e.id;
  visible.value = true;
  modalTitle.value = e.name;
  getPaymentAgencyList();
  getList();
};
const getList = async () => {
  let newForm = cloneDeep(formModel.value);
  let dateArr = newForm.currentDay.split('-');
  const { data, code, total } = await getDailyIncomeStatisticsListByQuery({
    params: {
      page: pagination.current,
      size: pagination.pageSize,
      shopId: shopId.value,
      year: dateArr[0],
      month: dateArr[1],
      date: dateArr[2],
      orderByDesc: 'counts_time',
      ...newForm,
    },
  });
  if (code == 10002) {
    if (total) pagination.total = total;
    for (const i of data) {
      for(const j of paymentAgencyList.value){
        // console.log(j);
        if(i.paymentAgencyShortName == j.paymentAgencyName){
          i.paymentAgencyShortNameTitle = j.name;
        }else if(!i.paymentAgencyShortName){
          i.paymentAgencyShortNameTitle = '总数统计';
        }
      }
    }
    list.value = data;
  } else {
    list.value = [];
  }
};
const getPaymentAgencyList = async () => {
  const { code, data } = await getPaymentAgencyListByQuery({
    params:{
      page: 1,
      size: 200,
    }
  })
  if(code === 10002){
    paymentAgencyList.value = data
  }else{
    paymentAgencyList.value = []
  }
}
const resetFields = () => {
  formRef.value.resetFields();
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

.editor {
  width: 100%;
  height: 388px;
}
</style>
