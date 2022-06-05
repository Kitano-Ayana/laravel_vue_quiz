<template>
  <div>
  <the-header></the-header>
    <main>
      <div class="container">
        <div class="row">
          <article class="col-sm-8">
            <section>
              <h2 class="quiz-question-h2">
                <img
                  class="quiz-question__logo"
                  src="/images/what-is-mark.png"
                />
                第{{ state.quizNumber }}問
              </h2>
              <p>{{ state.title }}</p>
              <div v-if="state.imageSrc">
                <img
                  class="img-responsive"
                  id="quiz-image"
                  :src="'/images/quiz/' + state.imageSrc"
                />
              </div>
              <div class="quiz-answer__list">
                <ul>
                  <li v-for="(answer, index) in state.answers" :key="index">
                    <a>
                      <button
                        @click="goAnswer(index + 1)"
                        :disabled="state.isAlreadyAnswered"
                      >
                        {{ index + 1 }}
                      </button>
                    </a>
                    {{ answer }}
                  </li>
                </ul>
              </div>
              <div class="text-right">カテゴリー: {{ state.categoryName }}</div>
            </section>
            <section>
              <h2 class="quiz-correct-h2">
                <img
                  class="quiz-correct__logo"
                  src="/images/correct-mark.png"
                />正解
              </h2>
              <p>
                <button
                  class="quiz-correct-answer"
                  v-show="state.isAlreadyAnswered"
                  disabled
                >
                  {{ state.correctAnswerNo }}
                </button>
              </p>
              <button class="quiz-show-answer" @click="goAnswer(0)" v-show="!state.isAlreadyAnswered">
                正解を表示する
              </button>
              <div class="alert alert-info" v-show="state.isCorrect">
                <strong>正解!</strong>
              </div>
              <div class="alert alert-danger" v-show="state.isMistake">
                <strong>不正解!</strong>
              </div>
            </section>
            <section>
              <h2 class="quiz-commentary-h2">
                <img
                  class="quiz-commentary__logo"
                  src="/images/commentary-mark.png"
                />解説
              </h2>
              <div
                class="quiz-commentary__text"
                v-show="state.isAlreadyAnswered"
              >
                {{ state.commentary }}
              </div>
              <button
                type="button"
                class="btn btn-primary d-block mx-auto quiz-next__button"
                @click="goNextQuiz"
                v-if="!state.isQuizFinish"
              >
                次の問題へ
              </button>
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#modal-result"
                class="d-block mx-auto quiz-finish__button"
                v-if="state.isQuizFinish"
              >
                結果を見る
              </button>

            </section>
          </article>
          <the-sidebar></the-sidebar>
        </div>
      </div>
    </main>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheFooter from "../layout/TheFooter";
import TheHeader from "../layout/TheHeader";
import TheSidebar from "../layout/TheSidebar";
import { reactive, onMounted } from "@vue/composition-api";

export default {
  components: {
    TheFooter,
    TheHeader,
    TheSidebar,
  },

  setup(props, context) {
    const state = reactive({
      quizData: [],
      title: "",
      imageSrc: "",
      answers: [],
      commentary: "",
      correctAnswerNo: 0,
      isCorrect: false, //正解かどうか
      isMistake: false, //間違いかどうか
      isAlreadyAnswered: false, //回答済みかどうか
      isQuizFinish: false, //クイズが終了したかどうか
      score: 0,
      quizNumber: 1,
      categoryName: "",
    });

    onMounted(() => {
      const router = context.root.$router;
      const categories = router.app.$route.query.categories;
      context.root.$http
        .get(`/api/quiz?categories=${categories}`)
        .then((response) => {
          state.quizData = response.data;
          findNextQuiz(0);
          console.log(state.quizData);
        });
    });

    const goAnswer = (selectAnswerNum) => {
      if (selectAnswerNum === 0) {
        // selectAnswerNumが0の場合は、click 「正解を表示する」ボタンのクリック alert-info、alert-dangerを非表示
        state.isCorrect = false;
        state.isMistake = false;
      } else if (selectAnswerNum === Number(state.correctAnswerNo)) {
        // 正解を押した場合 alert-infoを表示し、alert-dangerを非表示にする そしてスコアを加算する
        state.isCorrect = true;
        state.isMistake = false;
        state.score += 1;
      } else {
        // 不正解の場合 alert-infoを非表示し、alert-dangerを表示にする
        state.isMistake = true;
        state.isCorrect = false;
      }
      // 回答済みの設定をONにする 同じ問題に２回以上の回答をさせないため、そして解説を表示するため
      state.isAlreadyAnswered = true;
      
      // 10問以上回答している場合は、クイズを終了
      if (state.quizNumber >= 10) {
        endQuiz();
      }
    };

    const findNextQuiz = (quizNumber) => {
      state.title = state.quizData[quizNumber].title;
      state.answers = [
        state.quizData[quizNumber].answer.answer_1,
        state.quizData[quizNumber].answer.answer_2,
        state.quizData[quizNumber].answer.answer_3,
        state.quizData[quizNumber].answer.answer_4,
      ];
      state.commentary = state.quizData[quizNumber].answer.commentary;
      state.correctAnswerNo =
        state.quizData[quizNumber].answer.correct_answer_no;
      state.categoryName = state.quizData[quizNumber].category.name;
    };

    const goNextQuiz = () => {
      // 次の問題へをクリック
      if (state.quizNumber >= 10) {
        // 10問以上の場合はクイズを終了
        endQuiz();
      } else {
        // 次のクイズを表示し、クイズ番号を加算、alert-info、alert-danger、解説を非表示にする
        findNextQuiz(state.quizNumber);
        state.quizNumber += 1;
        state.isCorrect = false;
        state.isMistake = false;
        state.isAlreadyAnswered = false;
      }
    };
    const endQuiz = () => {
      state.isQuizFinish = true;
      state.answerNo = "-";
      state.isAlreadyAnswered = true;
    };

    return {
      state,
      findNextQuiz,
      goAnswer,
      goNextQuiz,
      endQuiz,
    };
  },
};
</script>
