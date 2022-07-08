<template>
  <div>
    <main>
      <div class="container">
        <div class="row">
          <div class="col-md-8 offset-md-2">
            <div class="card card-default">
              <div class="card-header text-center">ユーザー登録</div>
              <div class="form-group has-error" v-if="errors.length !== 0">
                <div class="alert alert-danger text-center">
                  ユーザー登録実行時にエラーが発生しました
                  <div v-for="(error, key, index) in errors" :key="index">
                    {{ error }}
                  </div>
                </div>
              </div>

              <div class="card-body">
                <ValidationObserver
                  class="form-horizontal"
                  ref="observer"
                  action="/register"
                  id="register"
                  method="post"
                  tag="form"
                  @submit.prevent="register()"
                  v-slot="{ invalid }"
                >
                  <input type="hidden" name="_token" :value="csrf" />

                  <div class="form-group">
                    <div class="row">
                      <label
                        for="name"
                        class="col-md-4 col-form-label text-md-right"
                        >名前</label
                      >

                      <div class="col-md-6">
                        <validation-provider
                          name="名前"
                          rules="required|max:20"
                          v-slot="{ errors }"
                        >
                          <input
                            v-model="state.name"
                            name="name"
                            type="text"
                            class="form-control"
                          />

                          <div class="alert alert-danger" v-show="errors[0]">
                            {{ errors[0] }}
                          </div>
                        </validation-provider>
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="row">
                      <label
                        for="email"
                        class="col-md-4 col-form-label text-md-right"
                        >メールアドレス</label
                      >

                      <div class="col-md-6">
                        <validation-provider
                          name="メールアドレス"
                          rules="required|email"
                          v-slot="{ errors }"
                        >
                          <input
                            v-model="state.email"
                            name="email"
                            type="email"
                            class="form-control"
                          />

                          <div class="alert alert-danger" v-show="errors[0]">
                            {{ errors[0] }}
                          </div>
                        </validation-provider>
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="row">
                      <label
                        for="password"
                        class="col-md-4 col-form-label text-md-right"
                        >パスワード</label
                      >

                      <div class="col-md-6">
                        <validation-provider
                          name="パスワード"
                          rules="required|min:8|confirmed:password_confirmation"
                          v-slot="{ errors }"
                        >
                          <input
                            v-model="state.password"
                            name="password"
                            type="password"
                            class="form-control"
                          />

                          <div class="alert alert-danger" v-show="errors[0]">
                            {{ errors[0] }}
                          </div>
                        </validation-provider>
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="row">
                      <label
                        for="password-confirm"
                        class="col-md-4 col-form-label text-md-right"
                        >パスワード再確認</label
                      >

                      <div class="col-md-6">
                        <validation-provider
                          name="パスワード再確認"
                          rules="required|min:8"
                          vid="password_confirmation"
                          v-slot="{ errors }"
                        >
                          <input
                            v-model="state.password_confirmation"
                            name="password_confirmation"
                            type="password"
                            class="form-control"
                          />

                          <div class="alert alert-danger" v-show="errors[0]">
                            {{ errors[0] }}
                          </div>
                        </validation-provider>
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="col-md-6 col-md-offset-4">
                      <button type="submit" class="btn btn-primary">
                        登録
                      </button>
                    </div>
                  </div>
                </ValidationObserver>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/composition-api";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { required, max, min, email, confirmed } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "{_field_}は必須です",
});
extend("email", {
  ...email,
  message: "{_field_}はメールアドレス形式で入力してください",
});
extend("min", {
  ...min,
  message: "{_field_}は最低でも{length}文字入力してください",
});
extend("max", {
  ...max,
  message: "{_field_}は最大でも{length}文字までです",
});
extend("confirmed", {
  ...confirmed,
  message: "再確認パスワードと入力が一致していません",
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },

 props: {
    errors: {
      type: Array | Object,
    },
  },
  setup(props, context) {
    const state = reactive({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",

    });

    const csrf = ref(
      document.querySelector('meta[name="csrf-token"]').getAttribute("content")
    );

    const register = async () => {
      const isValid = await context.refs.observer.validate();
      if (isValid) {
        document.querySelector("#register").submit();
      }
    };

    return {
      state,
      csrf,
      register
    };
  },
};
</script>
