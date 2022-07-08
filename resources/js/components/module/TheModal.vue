<template>
  <form action="/insertRanking" method="POST" id="finish-form">
    <div
      id="modal-result"
      tabindex="-1"
      class="modal fade"
      aria-hidden="true"
      role="dialog"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title text-center">正解率</h4>
          </div>
          <div class="modal-body text-center">
            <pie-chart :chartData="state.chartData" ref="chart"></pie-chart>
            <div>
              正解率 {{ correctPercentageObject["correctScore"] * 10 }} %
            </div>
            <input
              type="hidden"
              name="correctRatio"
              :value="correctPercentageObject['correctScore'] * 10"
            />
            <input type="hidden" name="_token" :value="csrf" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="quizFinish">
              終了する
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { reactive, ref } from "@vue/composition-api";
import PieChart from "./PieChart";

export default {
  components: {
    PieChart,
  },
  props: {
    correctPercentageObject: {
      type: Object,
    },
  },

  setup(props, context) {
    const state = reactive({
      chartOptions: {
        hoverBorderWidth: 20,
      },
      chartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: ["正解", "不正解"],
        datasets: [],
      },
    });
    const csrf = ref(
      document.querySelector('meta[name="csrf-token"]').getAttribute("content")
    );

    const render = () => {
      state.chartData.datasets = [
        {
          backgroundColor: ["#00D8FF", "#E46651"],
          data: [
            props.correctPercentageObject["correctScore"],
            props.correctPercentageObject["mistakeScore"],
          ],
        },
      ];
      context.refs.chart.renderPieChart();
    };

    const quizFinish = () => {
      document.querySelector("#finish-form").submit();
    };

    return {
      state,
      csrf,
      render,
      quizFinish,
    };
  },
};
</script>
