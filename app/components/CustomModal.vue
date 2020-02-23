<template>
  <!-- <ActionBar title="Home"/> -->
  <StackLayout class="MainMenu">
    <Label
      text
      textWrap="true"
    >
      <FormattedString>
        <Span text="لطفا جهت استفاده از برنامه به بخش ادمین ورود کرده  و برنامه را " />

        <Span
          text=" همگام سازی "
          style="color: red"
        />
        <Span text="کنید. " />
        <!-- <Span text="Also, this bit is italic, " fontStyle="italic" />
        <Span text="and this bit is bold." fontWeight="bold" />-->
      </FormattedString>
    </Label>
    <Label
      text="ورود به ادمین"
      textAlignment="center"
      textWrap="true"
      @tap="gotoAdmin"
      borderRadius="10%"
      backgroundColor="red"
      width="auto"
      padding="0 10"
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
    gotoAdmin() {
      this.$modal.close()
      //   this.$navigateTo(routes.admin);
      this.$showModal(routes.login)
    }
  }
}
</script>

<style scoped>
.MainMenu {
  background-image: url('../MainMenu.png');
  vertical-align: center;
  font-size: 15;
  margin: 15;
}

.description-label {
  margin-bottom: 15;
}
</style>
