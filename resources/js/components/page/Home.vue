<template>
  <div>
    <main>
      <div class="container">
        <div class="row">
          <article class="col-sm-8">
            <section class="home-quiz__introduction">
              <h2 class="home-quiz__introduction-h2">
                <img class="home-quiz__introduction-h2-logo" src="/images/what-is-mark.png" />4 Answers Quizとは?
              </h2>
              <p>4 Answers Quizとはビジネスマナーから一般常識に至るまで様々なクイズを4択で出題するWEBアプリです。</p>
              <p>何度もトライしてみて正解率100%を目指してみてください。</p>
            </section>
            <section class="home-quiz__setting">
              <h2 class="home-quiz__setting-h2">
                <img class="home-quiz__setting-h2-logo" src="/images/directory-icon.png" />出題設定
              </h2>
              <form>
                <label v-for="(cate, index) in state.category" :key="index">
                  <input type="checkbox" v-model="state.categories" :value="cate.id" checked />
                  {{ cate.name }}&ensp;
                </label>
                <div>
                  全項目チェック
                  <button type="button">ON</button>
                  <button type="button">OFF</button>
                </div>
                <button type="submit" class="btn btn-primary" @click.stop.prevent="goQuiz()">出題開始</button>
              </form>
            </section>
            <section class="home-quiz__ranking">
              <h2 class="home-quiz__ranking-h2">
                <img class="home-quiz__ranking-h2-logo" src="/images/graph-icon.png" />ランキング
              </h2>
              <div>
                <label>
                  <input class="ranking-radio" type="radio" v-model="state.rankingType" value="1" />総合
                </label>
                <label>
                  <input class="ranking-radio" type="radio" v-model="state.rankingType" value="2" />今月
                </label>
                <label>
                  <input class="ranking-radio" type="radio" v-model="state.rankingType" value="3" />今週
                </label>
              </div>
              <div class="home_quiz__ranking-chart">
                <bar-chart :chartData="state.total" ref="totalChart" v-show="state.rankingType === '1'"></bar-chart>
                <bar-chart :chartData="state.month" ref="monthChart" v-show="state.rankingType === '2'"></bar-chart>
                <bar-chart :chartData="state.week" ref="weekChart" v-show="state.rankingType === '3'"></bar-chart>
              </div>
            </section>
            <section class="home__notice">
              <h2 class="home__notice-h2">
                <img class="home__notice-h2-logo" src="/images/news-icon.png" />お知らせ情報
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
      <notifications />
    </main>
  </div>
</template>

<script>
import { reactive, onMounted } from "@vue/composition-api";
import TheSidebar from "../layout/TheSidebar";
import BarChart from "../module/BarChart";

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
      rankingAlldata: {},
      week: {},
      month: {},
      total: {},
      rankingType: "1"
    });

    onMounted(() => {
      context.root.$http.get("/api/category").then((response) => {
        state.category = response.data;
      });
      context.root.$http.get("/api/information").then((response) => {
        state.information = response.data;
      });
      context.root.$http.get("/api/ranking").then((response) => {
        state.rankingAlldata = response.data;
        setRanking();
      });
    });

    const setRanking = () => {
      state.week = Object.assign({}, state.week, {
        labels: state.rankingAlldata.weekRankingData.name,
        datasets: [
          {
            label: ["最高得点率"],
            backgroundColor: "rgba(0, 170, 248, 0.47)",
            data:
              state.rankingAlldata.weekRankingData.percentage_correct_answer,
          },
        ],
      });
      state.month = Object.assign({}, state.month, {
        labels: state.rankingAlldata.monthRankingData.name,
        datasets: [
          {
            label: ["最高得点率"],
            backgroundColor: "rgba(0, 170, 248, 0.47)",
            data:
              state.rankingAlldata.monthRankingData.percentage_correct_answer,
          },
        ],
      });
      state.total = Object.assign({}, state.total, {
        labels: state.rankingAlldata.totalRankingData.name,
        datasets: [
          {
            label: ["最高得点率"],
            backgroundColor: "rgba(0, 170, 248, 0.47)",
            data:
              state.rankingAlldata.totalRankingData.percentage_correct_answer,
          },
        ],
      });

      context.root.$nextTick(() => {
        context.refs.totalChart.renderBarChart();
        context.refs.monthChart.renderBarChart();
        context.refs.weekChart.renderBarChart();
      });
    };

    const goQuiz = () => {
      const router = context.root.$router;
      router.push("/quiz?categories=" + state.categories);
    };

    return {
      state,
      goQuiz,
    }
  },
};
</script>

