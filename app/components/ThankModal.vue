<template>
  <!-- <ActionBar title="Home"/> -->
  <StackLayout class="MainMenu">
    <Label
      text
      textWrap="true"
    >
      <FormattedString>
        <Span text="فرم نظرسنجی شما با موفقیت به ثبت رسید. با سپاس از همراهی شما." />

        <!-- <Span text="Also, this bit is italic, " fontStyle="italic" />
        <Span text="and this bit is bold." fontWeight="bold" />-->
      </FormattedString>
    </Label>
    <Label
      text="بازگشت به صفحه اصلی"
      textWrap="true"
      textAlignment="center"
      @tap="gotoMainMenu"
      borderRadius="10%"
      backgroundColor="red"
      color="white"
    />
  </StackLayout>
</template>

<script>
import routes from '~/routes/'
export default {
  data() {
    return {}
  },
  methods: {
    gotoMainMenu() {
      // this.$navigateTo(routes.mainMenu, {
      //   clearHistory: true
      // })
      this.$navigateBack()
      this.$modal.close()
    }
  }
}
</script>

<style scoped>
.MainMenu {
  background-image: url('../MainMenu.png');
  vertical-align: center;
  font-size: 20;
  margin: 15;
}

.description-label {
  margin-bottom: 15;
}
</style>
