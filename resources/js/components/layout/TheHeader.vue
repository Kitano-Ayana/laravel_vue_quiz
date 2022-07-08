<template>
  <header>
    <div class="container text-center">
      <h1>4 Answers Quiz 4択クイズ&クイズ徹底解説</h1>
      <router-link to="/">
        <img class="header-nav__logo" src="/images/header-logo.png" />
      </router-link>
    </div>

    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container">
        <router-link class="navbar-brand" id="header-nav__home" to="/"
          >ホーム</router-link
        >
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto"></ul>

          <ul class="navbar-nav">
            <li class="nav-item dropdown" v-if="auth.length !== 0">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="header-nav__name"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                >{{ auth.name }}</a
              >
              <div
                class="dropdown-menu header-nav__drop-down"
                aria-labelledby="header-nav__name"
              >
                <li class="text-center">
                  <router-link
                    class="navbar-brand"
                    id="header-nav__mypage"
                    to="/mypage"
                    >マイページ</router-link
                  >
                  <a
                    class="navbar-brand"
                    id="header-nav__logout"
                    @click="logout"
                    >ログアウト</a
                  >
                  <form
                    id="logout-form"
                    action="/logout"
                    method="POST"
                    style="display: none"
                  >
                    <input type="hidden" name="_token" :value="csrf" />
                  </form>
                </li>
              </div>
            </li>
            <li v-if="auth.length === 0" class="nav-item">
              <router-link id="header-nav__login" to="/login"
                >ログイン</router-link
              >
            </li>
            <li v-if="auth.length === 0" class="nav-item">
              <router-link id="header-nav__register" to="/register"
                >ユーザー登録</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { ref } from "@vue/composition-api";

export default {
  props: {
    auth: {
      type: Object | Array,
    },
  },
  setup() {
    const csrf = ref(
      document.querySelector('meta[name="csrf-token"]').getAttribute("content")
    );

    const logout = () => {
      document.querySelector("#logout-form").submit();
    };

    return {
      csrf,
      logout,
    };
  },
};
</script>

