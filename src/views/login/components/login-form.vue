<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">{{ $t('login.form.title') }}</div>
    <div class="login-form-sub-title">请您使用本系统APP扫码登录</div>
    <div class="login-form-error-msg">{{ errorMessage }}</div>
    <a-image :src="'data:image/png;base64,' + loginImage" width="200" />
    <icon-refresh @click="onRefresh" />
    <!-- <a-form
      ref="loginForm"
      :model="userInfo"
      class="login-form"
      layout="vertical"
      @submit="handleSubmit"
    >
      <a-form-item
        field="username"
        :rules="[{ required: true, message: $t('login.form.userName.errMsg') }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input
          v-model="userInfo.username"
          :placeholder="$t('login.form.userName.placeholder')"
        >
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="password"
        :rules="[{ required: true, message: $t('login.form.password.errMsg') }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input-password
          v-model="userInfo.password"
          :placeholder="$t('login.form.password.placeholder')"
          allow-clear
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-space :size="16" direction="vertical">
        <div class="login-form-password-actions">
          <a-checkbox
            checked="rememberPassword"
            :model-value="loginConfig.rememberPassword"
            @change="setRememberPassword as any"
          >
            {{ $t('login.form.rememberPassword') }}
          </a-checkbox>
          <a-link>{{ $t('login.form.forgetPassword') }}</a-link>
        </div>
        <a-button type="primary" html-type="submit" long :loading="loading">
          {{ $t('login.form.login') }}
        </a-button>
        <a-button type="text" long class="login-form-register-btn">
          {{ $t('login.form.register') }}
        </a-button>
      </a-space>
    </a-form> -->
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, onMounted, onUnmounted,onBeforeUnmount } from 'vue';
  import { useRouter } from 'vue-router';
  import { Message } from '@arco-design/web-vue';
  import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
  import { useI18n } from 'vue-i18n';
  import { useStorage } from '@vueuse/core';
  import { useUserStore } from '@/store';
  import useLoading from '@/hooks/loading';
  import type { LoginData } from '@/api/user';
  import { createLoginQrCode, loginByQrCode } from '@/api/user';
  import { setToken } from '@/utils/auth';

  const router = useRouter();
  const { t } = useI18n();
  const errorMessage = ref('');
  const { loading, setLoading } = useLoading();
  const userStore = useUserStore();

  const loginImage = ref('');
  var Timer: any = null;
  var TimerNum = 0;
  onMounted(() => {
    getCode();
  });
  const onRefresh = () => {
    clearInterval(Timer);
    TimerNum = 0;
    loginImage.value = '';
    getCode();
  };
  onBeforeUnmount(() => {
    clearInterval(Timer);
    TimerNum = 0;
    loginImage.value = '';
  });
  onUnmounted(() => {
    clearInterval(Timer);
    TimerNum = 0;
    loginImage.value = '';
  });
  const getCode = async () => {
    const { data, code } = await createLoginQrCode({
      width: '400',
      height: '400',
    });
    console.log(data, code, 999);
    if (code === 10002) {
      loginImage.value = data.qr_code_images;
      Timer = setInterval(() => {
        checkCodeStatus(data.qr_code.id, data.qr_code.randomCode);
        TimerNum += 1;
        if (TimerNum >= 118) {
          clearInterval(Timer);
          TimerNum = 0;
          loginImage.value = '';
          Message.error('码已失效 请手动刷新');
          // getCode()
        }
      }, 1000);
    }
  };
  const checkCodeStatus = async (id: string, randomCode: string) => {
    const { data, code, token } = await loginByQrCode({
      params: {
        qrCodeId: id,
        randomCode: randomCode,
      },
    });
    console.log(data, code);
    if (code == 10002) {
      clearInterval(Timer);
      TimerNum = 0;
      setToken(token.access_token);
      userStore.setInfo(data);
      const { redirect, ...othersQuery } = router.currentRoute.value.query;
      router.push({
        name: (redirect as string) || 'Workplace',
        query: {
          ...othersQuery,
        },
      });
      Message.success(t('login.form.login.success'));
    } else {
      if (code !== 28002) {
        clearInterval(Timer);
        TimerNum = 0;
        loginImage.value = '';
      }
    }
  };
  const loginConfig = useStorage('login-config', {
    rememberPassword: true,
    username: '', // 演示默认值
    password: '', // demo default value
  });
  const userInfo = reactive({
    username: loginConfig.value.username,
    password: loginConfig.value.password,
  });

  const handleSubmit = async ({
    errors,
    values,
  }: {
    errors: Record<string, ValidatedError> | undefined;
    values: Record<string, any>;
  }) => {
    if (loading.value) return;
    if (!errors) {
      setLoading(true);
      try {
        window.localStorage.clear();
        await userStore.login(values as LoginData);
        const { redirect, ...othersQuery } = router.currentRoute.value.query;
        router.push({
          name: (redirect as string) || 'Workplace',
          query: {
            ...othersQuery,
          },
        });
        Message.success(t('login.form.login.success'));
        const { rememberPassword } = loginConfig.value;
        const { username, password } = values;
        // 实际生产环境需要进行加密存储。
        // The actual production environment requires encrypted storage.
        loginConfig.value.username = rememberPassword ? username : '';
        loginConfig.value.password = rememberPassword ? password : '';
      } catch (err) {
        errorMessage.value = (err as Error).message;
      } finally {
        setLoading(false);
      }
    }
  };
  const setRememberPassword = (value: boolean) => {
    loginConfig.value.rememberPassword = value;
  };
</script>

<style lang="less" scoped>
  .login-form {
    &-wrapper {
      width: 320px;
    }

    &-title {
      color: var(--color-text-1);
      font-weight: 500;
      font-size: 24px;
      line-height: 32px;
    }

    &-sub-title {
      color: var(--color-text-3);
      font-size: 16px;
      line-height: 24px;
    }

    &-error-msg {
      height: 32px;
      color: rgb(var(--red-6));
      line-height: 32px;
    }

    &-password-actions {
      display: flex;
      justify-content: space-between;
    }

    &-register-btn {
      color: var(--color-text-3) !important;
    }
  }
</style>
