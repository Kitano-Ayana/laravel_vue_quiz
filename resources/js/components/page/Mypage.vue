<template>
        <div class="row">
          <article class="col-sm-8">
            <section>
              <h2 class="mypage-h2">
                <img class="mypage__logo" src="/images/mypage-icon.png" />マイページ
              </h2>
              <h3
              >直近 回の正解率推移</h3>
              <canvas></canvas>
            </section>
          </article>
          <the-sidebar></the-sidebar>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { onMounted, reactive } from "@vue/composition-api";
import TheSidebar from "../layout/TheSidebar";

export default {
  components: {
    TheSidebar,
  },

  setup(props, context) {
    onMounted(() => {
      context.root.$http.get("/api/user").then((response) => {
        console.log(response.data);
      });
    });
  }
};
</script>
