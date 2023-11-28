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
        {{ formData?.id ? '编辑套餐' : '新增套餐' }}
      </template>
      <a-form ref="formRef" layout="vertical" :model="formData">
        <a-space direction="vertical" :size="16">
          <a-card class="general-card">
            <template #title> 必填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item field="carParkId" label="停车场" required>
                  <a-select
                    :loading="loading"
                    placeholder="请输入"
                    allow-search
                    allow-clear
                    @search="handleSelectSearch"
                    :filter-option="false"
                    v-model="formData.carParkId"
                    @change="carParkIdChangeFn"
                  >
                    <a-option v-for="item of parkList" :value="item.id">{{
                      item.name
                    }}</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="套餐开始时间"
                  field="startTime"
                  validate-trigger="input"
                  required
                >
                  <a-date-picker
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                    v-model="formData.startTime"
                  />
                  <!-- <a-input
                    v-model="formData.startTime"
                    placeholder="请输入"
                    allow-clear
                  ></a-input> -->
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="套餐结束时间"
                  field="endTime"
                  validate-trigger="input"
                  required
                >
                  <a-date-picker
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                    v-model="formData.endTime"
                  />
                  <!-- <a-input
                    v-model="formData.endTime"
                    placeholder="请输入"
                    allow-clear
                  ></a-input> -->
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="车牌号"
                  field="numberPlate"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.numberPlate"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="套餐产品"
                  field="packageProductId"
                  validate-trigger="input"
                  required
                >
                  <a-select
                    placeholder="请输入"
                    allow-clear
                    v-model="formData.packageProductId"
                  >
                    <a-option
                      :disabled="!formData.carParkId"
                      :value="item.id"
                      v-for="item in productList"
                      :key="item.id"
                      >{{ item.title }}</a-option
                    >
                  </a-select>
                  <!-- <a-input
                    v-model="formData.packageProductId"
                    placeholder="请输入"
                    allow-clear
                    :disabled="!formData.carParkId"
                  ></a-input> -->
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="手机号"
                  field="phone"
                  validate-trigger="input"
                  required
                >
                  <a-input
                    v-model="formData.phone"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="是否是内部指定套餐"
                  field="specialGive"
                  validate-trigger="input"
                  required
                >
                  <a-select
                    v-model="formData.specialGive"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">否</a-option>
                    <a-option :value="1">是</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="状态"
                  field="status"
                  validate-trigger="input"
                  required
                >
                  <a-select
                    v-model="formData.status"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">禁用</a-option>
                    <a-option :value="1">正常</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <!-- <a-col :span="8">
                <a-form-item
                  label="是否为跨区"
                  field="transRegional"
                  validate-trigger="input"
                  required
                >
                  <a-select
                    v-model="formData.transRegional"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">否</a-option>
                    <a-option :value="1">是</a-option>
                  </a-select>
                </a-form-item>
              </a-col> -->
              <a-col :span="8">
                <a-form-item
                  label="跨区停车场"
                  field="transRegionalCarParkIds"
                  validate-trigger="input"
                >
                  <a-select
                    :loading="loading"
                    placeholder="请输入"
                    allow-search
                    allow-clear
                    multiple
                    @search="handleSelectSearch"
                    :filter-option="false"
                    v-model="formData.transRegionalCarParkIds"
                  >
                    <a-option v-for="item of parkList" :value="item.id">{{
                      item.name
                    }}</a-option>
                  </a-select>

                  <!-- <a-select
                    v-model="formData.transRegionalCarParkIds"
                    placeholder="请选择"
                    allow-clear
                  >
                    <a-option :value="0">否</a-option>
                    <a-option :value="1">是</a-option>
                  </a-select> -->
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="车辆类型"
                  field="typeKey"
                  validate-trigger="input"
                  required
                >
                  <a-select
                    placeholder="请输入"
                    allow-clear
                    v-model="formData.typeKey"
                  >
                    <a-option
                      :value="item.flagKey"
                      v-for="item in carTypeList"
                      :key="item.id"
                      >{{ item.name }}</a-option
                    >
                  </a-select>
                  <!-- <a-input
                    v-model="formData.type_key"
                    placeholder="请输入"
                    allow-clear
                  ></a-input> -->
                </a-form-item>
              </a-col>
            </a-row>
          </a-card>
          <a-card class="general-card">
            <template #title> 选填信息 </template>
            <a-row :gutter="80">
              <a-col :span="8">
                <a-form-item
                  label="车主名称"
                  field="carOwnerName"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.carOwnerName"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="分组"
                  field="groupFlag"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.groupFlag"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="父级id"
                  field="parentId"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.parentId"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="备注"
                  field="remarks"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.remarks"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="specialCarId"
                  field="specialCarId"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.specialCarId"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  label="用户id"
                  field="uid"
                  validate-trigger="input"
                >
                  <a-input
                    v-model="formData.uid"
                    placeholder="请输入"
                    allow-clear
                  ></a-input>
                </a-form-item>
              </a-col>
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
  import {
    packageListAdd,
    packageListUpdate,
    cfCarParkGet,
    packageListGet,
    cfCarParkSearch,
    productGet,
  } from '@/api/internetOfThings';
  import { Message } from '@arco-design/web-vue';
  import dayjs from 'dayjs';
  import { parseTime } from '@/utils';
  import { cloneDeep } from 'lodash';
  import { getCarTypeListByQuery } from '@/api/park';

  const visible = ref(false);
  const loading = ref(false);
  const selectLoading = ref(false);
  const parkList = ref([]);
  const formRef = ref();
  const emit = defineEmits(['fetchData', 'fetch-data']);
  const formData = ref({
    carOwnerName: '',
    carParkId: '',
    endTime: '',
    groupFlag: '',
    numberPlate: '',
    packageProductId: '',
    parentId: '',
    phone: '',
    remarks: '',
    specialCarId: '',
    specialGive: '',
    startTime: '',
    status: '',
    transRegional: '',
    typeKey: '',
    uid: '',
    transRegionalCarParkIds: [],
    id: '',
  });
  const carTypeList = ref([]);
  const productList = ref([]);
  const getCarType = async () => {
    const { data, code, message } = await getCarTypeListByQuery({
      params: {
        page: 1,
        size: 200,
      },
    });
    if (code === 10002) {
      carTypeList.value = data;
    } else {
      // @ts-ignore
      // Message.error(message);
    }
  };
  const handleClick = (e: any = null) => {
    getCarList();
    getCarType();
    if (e?.id) {
      const newInfo = JSON.parse(JSON.stringify(e));
      newInfo.startTime = parseTime(e.startTime);
      newInfo.endTime = parseTime(e.endTime);
      formData.value = newInfo;
      // getCrossDistrict(newInfo.id);
      getProductList(newInfo.carParkId);
    }
    visible.value = true;
  };
  const carParkIdChangeFn = (e: any) => {
    formData.value.packageProductId = e ? (getProductList(e), '') : '';
  };
  const getProductList = async (id: any) => {
    const { data, code } = await productGet({
      params: {
        carParkId: id,
        page: 1,
        size: 200,
        specialCarPackage: 0,
      },
    });
    console.log(data, 'tadarada');
    if (code == 10002) {
      productList.value = data;
    } else {
      productList.value = [];
    }
  };
  const resetFields = () => {
    formData.value.id = '';
    formRef.value.resetFields();
  };
  // const getCrossDistrict = async (id: any) => {
  //   const { data, code } = await packageListGet({
  //     params: {
  //       parentId: id,
  //       page: 1,
  //       size: 200,
  //     },
  //   });
  //   console.log(data, code, 111);
  //   formData.value.transRegionalCarParkIds = data
  // };
  const handleSelectSearch = async (value: any) => {
    if (value) {
      selectLoading.value = true;
      const { data, code } = await cfCarParkSearch({
        params: {
          name: value,
          page: 1,
          size: 200,
        },
      });
      selectLoading.value = false;
      if (code === 10002) {
        parkList.value = data;
      } else {
        parkList.value = [];
      }
    } else {
      parkList.value = [];
    }
  };
  const getCarList = async () => {
    const { data, code } = await cfCarParkSearch({
      params: {
        page: 1,
        size: 20,
      },
    });
    if (code === 10002) {
      parkList.value = data;
    } else {
      parkList.value = [];
    }
  };
  const onSubmitClick = () => {
    // eslint-disable-next-line consistent-return
    formRef.value.validate(async (valid: any) => {
      if (valid) return false;
      const newForm = cloneDeep(formData.value);
      newForm.startTime = dayjs(formData.value.startTime).valueOf();
      newForm.endTime = dayjs(formData.value.endTime).valueOf();
      newForm.transRegionalCarParkIds = formData.value.transRegionalCarParkIds;
      // @ts-ignore
      if (formData.value.id) {
        const { code } = await packageListUpdate(newForm);
        if (code === 10002) {
          formRef.value.resetFields();
          visible.value = false;
          Message.success('更新成功!');
          emit('fetchData');
        }
      } else {
        const { code } = await packageListAdd(newForm);
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
