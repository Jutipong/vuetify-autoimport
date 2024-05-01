<script setup lang="ts">
const router = useRouter()
function backPage() {
  router.back()
}
</script>

<template>
  <v-container>
    <v-card>
      <section class="page_404">
        <div class="container">
          <div class="row">
            <div class="col-sm-12 ">
              <div class="col-sm-10 col-sm-offset-1  text-center">
                <div class="four_zero_four_bg">
                  <h1 class="text-center ">
                    404
                  </h1>
                </div>

                <div class="contant_box_404">
                  <h3 class="h2">
                    Look like you're lost
                  </h3>

                  <p>the page you are looking for not avaible!</p>

                  <!-- <a href="" class="link_404">Go to Home</a> -->
                  <v-btn
                    prepend-icon="mdi-arrow-left"
                    color="success mt-5 btn-lg"
                    @click="backPage"
                  >
                    Back
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </v-card>
  </v-container>
</template>

<style scoped>
  .page_404 {
  padding: 40px 0;
  background: #fff;
}

.page_404 img {
  width: 100%;
}

.four_zero_four_bg {
  background-image: url('../assets/images/404.gif');
  height: 400px;
  background-position: center;
}

.four_zero_four_bg h1 {
  font-size: 80px;
}

.four_zero_four_bg h3 {
  font-size: 80px;
}

.link_404 {
  color: #fff !important;
  padding: 10px 20px;
  background: #39ac31;
  margin: 20px 0;
  display: inline-block;
}

.contant_box_404 {
  margin-top: -50px;
}
</style>
