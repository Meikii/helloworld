<template>
  <Page
    actionBarHidden="true"
    backgroundSpanUnderStatusBar="true"
    androidStatusBarBackground="#34495e"
  >
    <StackLayout>
      <!-- <GridLayout
        rows="*,*,*,*,*"
        columns="*,*,*"
      > -->

      <Label
        marginTop="0"
        :text="part"
        textWrap="true"
        fontSize="20"
        backgroundColor="#34495e"
        textAlignment="center"
        verticalAlignment="center"
        color="white"
        height="50"
      />
      <ScrollView height="95%">
        <StackLayout backgroundColor="#ecf0f1">

          <GridLayout
            :rows="rows"
            columns="*,20*,*, 20*, *"
          >

            <CardView
              elevation="0"
              radius="0"
              borderWidth="1px"
              borderRadius="10"
              backgroundColor="rgba(255,0,0,0)"
              class="card"
              v-for="(qnr,index) of questionnaires"
              :key="index"
              :row="index/2"
              :col="index%2==0 ? '1' : '3'"
              :horizontalAlignment="index%2==0 ? 'left' : 'right'"
              :width="questionnaires.length == 1 ? '100%'  : '50%'"
              :colSpan="index == questionnaires.length - 1 ? '5' : '1'"
              :marginLeft="questionnaires.length == 1 ? '0' : ( index == questionnaires.length - 1 ? '25%' : '0')"
            >
              <StackLayout>

                <Label
                  margin="10"
                  padding="10"
                  textWrap="true"
                  :text="qnr.name"
                  textAlignment="center"
                  verticalAlignment="middle"
                  borderRadius="20%"
                  backgroundColor="#17ac8f"
                  fontSize="10"
                  color="#34495e"
                  style="android-elevation:8;"
                  @tap="gotoSurvey(qnr.id)"
                >
                  <!-- <Image
                  src="font://&#xf51e;"
                  stretch="none"
                  class="fas"
                ></Image> -->
                  <FormattedString>

                    <Span
                      :text="String.fromCharCode('0x'+qnr.font.split(':')[0])+String.fromCharCode(0xa)"
                      :class="qnr.font.split(':')[1] || 'fas'"
                    />
                    <Span :text="qnr.name+String.fromCharCode(0xa)" />
                    <!-- <Span :text="qnr.font" /> -->
                  </FormattedString>
                </Label>
              </StackLayout>
            </CardView>
          </GridLayout>
        </StackLayout>
      </ScrollView>
    </StackLayout>
  </Page>
</template>

<script>
import locaLStorage from 'nativescript-localstorage'
import routes from '~/routes/'

export default {
  props: ['part'],
  data() {
    return {
      questionnaires: localStorage
        .getItem('questionnaires')
        .questionnaires.filter(x => x.isDemographic == 0),
      isBusy: false,
      rows: ''
    }
  },
  mounted() {
    console.log('questionnaires')
    console.dir(this.part)
    this.questionnaires = this.questionnaires.filter(x => x.part == this.part)
    this.rows = new Array(Math.ceil(this.questionnaires.length / 2))
      .fill('*')
      .join()

    console.log('this.rows')
    console.log(this.rows)
  },
  methods: {
    gotoSurvey(id) {
      console.log(id)
      let questionnaire = this.questionnaires.filter(x => x.id == id)[0]
      if (this.part == 'نظرسنجی بیماران') {
        let demographic = localStorage
          .getItem('questionnaires')
          .questionnaires.filter(x => x.isDemographic == 1)[0]
        this.$navigateTo(routes.demographic, {
          /////////
          backstackVisible: false,
          props: {
            from: 'patient',
            questionnaire: demographic,
            id: id
          }
        })
      } else {
        this.$navigateTo(routes.surveyPage, {
          /////////
          backstackVisible: false,
          props: {
            from: 'patient',
            questionnaire: questionnaire
          }
        })
      }
    }
  }
}
</script>

<style scoped>
Page {
  background-color: rgb(241, 241, 241);
}
.card {
  border-width: 0;
  border-radius: 50%;
  clip-path: circle(100% at 50% 50%);
  background-color: rgba(255, 255, 255, 0);
}
</style>
