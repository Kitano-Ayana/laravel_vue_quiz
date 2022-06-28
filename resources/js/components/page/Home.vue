<template>
  <div>
    <main>
      <div class="container">
        <div class="row">
          <article class="col-sm-8">
            <section class="home-quiz__introduction">
              <h2 class="home-quiz__introduction-h2">
                <img
                  class="home-quiz__introduction-h2-logo"
                  src="/images/what-is-mark.png"
                />4 Answers Quizとは?
              </h2>
              <p>
                4 Answers
                Quizとはビジネスマナーから一般常識に至るまで様々なクイズを4択で出題するWEBアプリです。
              </p>
              <p>何度もトライしてみて正解率100%を目指してみてください。</p>
            </section>
            <section class="home-quiz__setting">
              <h2 class="home-quiz__setting-h2">
                <img
                  class="home-quiz__setting-h2-logo"
                  src="/images/directory-icon.png"
                />出題設定
              </h2>
              <form action="/quiz" method="post">
                <label v-for="(cate, index) in state.category" :key="index">
                  <input
                    type="checkbox"
                    v-model="state.categories"
                    :value="cate.id"
                  />{{ cate.name }}&ensp;
                </label>
                <div class>
                  全項目チェック
                  <button
                    type="button"
                    name="check_all"
                    id="check-all"
                    value="1"
                  >
                    ON
                  </button>
                  <button
                    type="button"
                    name="check_all_off"
                    id="check-all-off"
                    value="1"
                  >
                    OFF
                  </button>
                </div>
                <button
                  type="submit"
                  class="btn btn-primary"
                  @click.stop.prevent="goQuiz()"
                >
                  出題開始
                </button>
                <input type="hidden" name="_token" value />
              </form>
            </section>
            <section class="home-quiz__ranking">
              <h2 class="home-quiz__ranking-h2">
                <img
                  class="home-quiz__ranking-h2-logo"
                  src="/images/graph-icon.png"
                />ランキング
              </h2>
              <div>
                <label>
                  <input
                    class="ranking-radio"
                    type="radio"
                    name="ranking-radio"
                    value="1"
                    checked
                  />総合
                </label>
                <label>
                  <input
                    class="ranking-radio"
                    type="radio"
                    name="ranking-radio"
                    value="2"
                  />今月
                </label>
                <label>
                  <input
                    class="ranking-radio"
                    type="radio"
                    name="ranking-radio"
                    value="3"
                  />今週
                </label>
              </div>
              <div class="home_quiz__ranking-chart">
                <bar-chart></bar-chart>
              </div>
            </section>
            <section class="home__notice">
              <h2 class="home__notice-h2">
                <img
                  class="home__notice-h2-logo"
                  src="/images/news-icon.png"
                />お知らせ情報
              </h2>
              <dl v-for="(info, index) in state.information" :key="index">
                <dt>{{ info.created_at }}</dt>
                <dd>{{ info.information }}</dd>
              </dl>
            </section>
          </article>
          <the-sidebar></the-sidebar>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import TheSidebar from "../layout/TheSidebar";
import BarChart from "../module/BarChart";
import { reactive, onMounted } from "@vue/composition-api";

export default {
  components: {
    TheSidebar,
    BarChart,
  },

  setup(props, context) {
    const state = reactive({
      categories: [1],
      information: [],
      category: [],
    });

    const goQuiz = () => {
      const router = context.root.$router;
      router.push("/quiz?categories=" + state.categories);
    };

    onMounted(() => {
      context.root.$http.get("/api/information").then((response) => {
        state.information = response.data;
      });

      context.root.$http.get("/api/category").then((response) => {
        state.category = response.data;
      });
    });

    return {
      state,
      goQuiz,
    };
  },
};
</script>

