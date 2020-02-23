<template>
  <Page
    actionBarHidden="true"
    backgroundSpanUnderStatusBar="true"
    androidStatusBarBackground="#34495e"
  >
    <StackLayout>
      <Label
        marginTop="0"
        :text="questionnaire.name"
        textWrap="true"
        fontSize="20"
        backgroundColor="#34495e"
        textAlignment="center"
        verticalAlignment="center"
        color="white"
        height="50"
      />

      <ScrollView height="85%">
        <StackLayout>

          <StackLayout
            col="1"
            margin="10"
            elevation="40"
            radius="1"
            v-for="(q, index) of questions"
            :key="index"
            style="background-color: white;"
          >
            <StackLayout>

              <Label
                :text="q.question"
                textWrap="true"
                textAlignment="left"
                style="font-weight: bold;"
                paddingRight="1%"
              />
              <Label
                :text="'گزینه‌ها:'"
                textWrap="true"
                ios:textAlignment="right"
                style="font-weight: bold;"
                paddingRight="1%"
              />

              <StackLayout>

                <Button
                  v-for="(c,index2) of q.choices.split('\r\n')"
                  :key="index2"
                  :text="c"
                  margin='2'
                  borderRadius='10'
                  textAlignment="center"
                  textWrap="true"
                  :color="chosenQuestions[index*10+index2] ? 'white' : 'black'"
                  :backgroundColor="chosenQuestions[index*10+index2] ? '#014ca8' : '#dddddd'"
                  @tap="choose(index, index2)"
                />
              </StackLayout>
            </StackLayout>
          </StackLayout>

        </StackLayout>

      </ScrollView>
      <Button
        text="ثبت"
        backgroundColor="green"
        @tap="submit"
        height="200"
      />
    </StackLayout>
  </Page>
</template>

<script>
import locaLStorage from 'nativescript-localstorage'
import routes from '~/routes/'

export default {
  props: ['questionnaire', 'from', 'id'],
  data() {
    return {
      isBusy: false,
      questions: this.questionnaire.questions,
      chosenQuestions: new Array(10).fill(0),
      answerSheet: [],
      checked: false,
      chosen: this.questionnaire.chosen || [],
      form: '',
      questionnaires: localStorage.getItem('questionnaires').questionnaires
    }
  },
  mounted() {
    if (this.chosen) {
      console.log('test')
      console.dir(this.chosen)
      console.log(this.chosen.length)
      for (let index2 = 0; index2 < this.chosen.length; index2++)
        for (let index = 0; index < 10; index++) {
          // this.$set(this.chosenQuestions, index * 5, 0)
          this.$set(
            this.chosenQuestions,
            index2 * 10 + index,
            this.chosen[index2] === index ? 1 : 0
          )
          // this.$set(this.chosenQuestions, index * 5 + 2, 0)
          // this.$set(this.chosenQuestions, index * 5 + 3, 0)
          // this.$set(this.chosenQuestions, index * 5 + 4, 0)
          // this.$set(
          //   this.chosenQuestions,
          //   index * 5 + index2,
          //   this.chosen[index2]
          // )
          // this.$set(this.chosen, index, index2)
        }
      console.log('this.chosenQuestions')
      console.log(this.chosenQuestions)
    }
  },
  methods: {
    submit() {
      console.log('localStorage.getItem')
      console.log(localStorage.getItem('forms'))
      this.form = new Object({
        id: this.questionnaire.id,
        name: this.questionnaire.name,
        time: Date.now(),
        questions: this.questionnaire.questions,
        answers: this.answerSheet,
        question_ids: this.questionnaire.question_ids,
        part: this.questionnaire.part,
        question_count: this.questionnaire.question_count,
        chosen: this.chosen
      })
      console.log('this.form')
      console.log(this.form)

      let questionnaire = this.questionnaires.filter(x => x.id == this.id)[0]
      this.$navigateTo(routes.surveyPage, {
        /////////
        backstackVisible: false,
        props: {
          from: 'patient',
          questionnaire: questionnaire,
          demo: this.form
        }
      })
      // let forms = []

      // forms = localStorage.getItem('forms') || { forms: [] }
      // if (this.from == 'admin') {
      //   console.log(forms.forms)
      //   forms.forms.splice(
      //     forms.forms.findIndex(e => e.time == this.questionnaire.time),
      //     1
      //   )
      // }
      // forms.forms.push(this.form)

      // console.log('forms')
      // console.log(forms)

      // localStorage.setItemObject('forms', forms)

      // console.log('this.forms')
      // console.log(localStorage.getItem('forms'))

      // this.$showModal(routes.thankModal).then(res => {})
    },
    choose(index, index2) {
      this.$set(this.chosenQuestions, index * 10, 0)
      this.$set(this.chosenQuestions, index * 10 + 1, 0)
      this.$set(this.chosenQuestions, index * 10 + 2, 0)
      this.$set(this.chosenQuestions, index * 10 + 3, 0)
      this.$set(this.chosenQuestions, index * 10 + 4, 0)

      this.$set(this.chosenQuestions, index * 10 + 5, 0)
      this.$set(this.chosenQuestions, index * 10 + 6, 0)
      this.$set(this.chosenQuestions, index * 10 + 7, 0)
      this.$set(this.chosenQuestions, index * 10 + 8, 0)
      this.$set(this.chosenQuestions, index * 10 + 9, 0)
      this.$set(this.chosenQuestions, index * 10 + index2, 1)
      this.$set(this.chosen, index, index2)
      // Answer sheet
      this.$set(
        this.answerSheet,
        index,
        new Object({
          question: this.questions[index].question,
          answer: this.questions[index].choices.split('\r\n')[index2]
        })
      )
    }
  }
}
</script>

<style scoped>
* {
  font-size: 20;
}
Page {
  background-color: rgb(241, 241, 241);
}
</style>
