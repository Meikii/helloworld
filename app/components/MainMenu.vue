<template>
  <Page
    actionBarHidden="true"
    backgroundSpanUnderStatusBar="true"
    
    ref="page"
  >
    <GridLayout rows="*">

      <StackLayout>

        <CardView
          borderRadius="100%"
          elevation="0"
          height="25%"
          backgroundColor="rgba(0,0,0,0)"
          class="coverImage1"
          width="100%"
          @tap="gotoSurvey(1)"
        >
          <GridLayout rows="*">

            <!-- <Label text="This is Label 1" top=""  right="" bottom="" left="" /> -->

            <!-- <Image
              src="https://picsum.photos/seed/1/400/200"
              stretch="aspectFill"
            /> -->

            <Image
              src="~/images/Patient.jpg"
              stretch="aspectFill"
              tintColor="rgba(0,0,0,.25)"
            />

            <Label
              horizontalAlignment="right"
              verticalAlignment="bottom"
              text="نظرسنجی بیماران"
              textAlignment="center"
              textWrap="true"
              color="white"
              fontSize="20"
              fontWeight="bold"
              width="auto"
              padding="0 10"
              margin="0 10 10 0"
              backgroundColor="#19bc9f"
              borderRadius="20%"
            />
          </GridLayout>
        </CardView>
        <CardView
          borderRadius="100%"
          elevation="0"
          height="25%"
          backgroundColor="rgba(0,0,0,0)"
          class="coverImage1"
          width="100%"
          @tap="gotoSurvey(2)"
        >
          <GridLayout rows="*">

            <!-- <Label text="This is Label 1" top=""  right="" bottom="" left="" /> -->

            <Image
              src="~/images/Clinical.jpg"
              stretch="aspectFill"
              class="image"
              tintColor="rgba(0,0,0,.25)"
            />
            <Label
              horizontalAlignment="right"
              verticalAlignment="bottom"
              text="حاکمیت بالینی"
              textAlignment="center"
              textWrap="true"
              color="white"
              fontSize="20"
              fontWeight="bold"
              width="auto"
              padding="0 10"
              margin="0 10 10 0"
              backgroundColor="#19bc9f"
              borderRadius="20%"
            />

          </GridLayout>
        </CardView>

        <CardView
          borderRadius="100%"
          elevation="0"
          height="25%"
          backgroundColor="rgba(0,0,0,0)"
          class="coverImage1"
          width="100%"
          @tap="gotoSurvey(3)"
        >
          <GridLayout rows="*">

            <!-- <Label text="This is Label 1" top=""  right="" bottom="" left="" /> -->

            <Image
              src="~/images/Trial.jpg"
              stretch="aspectFill"
              tintColor="rgba(0,0,0,.25)"
            />
            <Label
              horizontalAlignment="right"
              verticalAlignment="bottom"
              text="رضایتمندی شغلی"
              textAlignment="center"
              textWrap="true"
              color="white"
              fontSize="20"
              fontWeight="bold"
              width="auto"
              padding="0 10"
              margin="0 10 10 0"
              backgroundColor="#19bc9f"
              borderRadius="20%"
            />

          </GridLayout>
        </CardView>
        <CardView
          borderRadius="100%"
          elevation="0"
          height="25%"
          backgroundColor="rgba(0,0,0,0)"
          class="coverImage1"
          width="100%"
          @tap="gotoAdmin"
        >
          <GridLayout rows="*">

            <!-- <Label text="This is Label 1" top=""  right="" bottom="" left="" /> -->

            <Image
              src="~/images/management.jpg"
              stretch="aspectFill"
              tintColor="rgba(0,0,0,.25)"
            />
            <Label
              horizontalAlignment="right"
              verticalAlignment="bottom"
              text="مدیریت"
              textAlignment="center"
              textWrap="true"
              color="white"
              fontSize="20"
              fontWeight="bold"
              width="auto"
              padding="0 10"
              margin="0 10 10 0"
              backgroundColor="#19bc9f"
              borderRadius="20%"
            />

          </GridLayout>
        </CardView>
      </StackLayout>
      <Image
        src="~/images/najmieh.png"
        backgroundColor="rgba(255,255,255,0)"
        stretch="aspectFill"
        verticalAlignment="top"
        horizontalAlignment="left"
        margin="5%"
        style="android-elevation:15;"
        width="100"
        height="100"
        borderRadius="0"
      />
    </GridLayout>
  </Page>
</template>

<script>
import locaLStorage from 'nativescript-localstorage'
import PatientSurvey from './PatientSurvey'
import routes from '~/routes/'
import modal from './CustomModal'
import login from './Login'
import * as application from 'tns-core-modules/application'

export default {
  data() {
    return {
      test: localStorage.getItem('test'),
      page: ''
    }
  },
  created() {
    application.android.on(
      application.AndroidApplication.activityBackPressedEvent,
      res => {
        console.log()
      }
    )
    this.checkLocal()
  },
  methods: {
    goBack() {
      this.$navigateBack()
    },
    gotoSurvey(id) {
      console.log('OKKKKKKKKKKK')
      if (!localStorage.getItem('questionnaires')) {
        setTimeout(() => {
          this.$showModal(modal, { cancelable: false }).then(res => {})
        }, 10)
      } else
        this.$navigateTo(PatientSurvey, {
          props: {
            part:
              id == 1
                ? 'نظرسنجی بیماران'
                : id == 2
                ? 'حاکمیت بالینی'
                : 'رضایتمندی شغلی'
          }
        })
    },
    gotoAdmin() {
      console.log('admin')
      this.$navigateTo(routes.admin)
      return
      this.$showModal(login)
      // this.$navigateTo(routes.admin);
    },
    testFunc() {
      console.log('YYYYYYYYYYYYYYYYY')
      this.$navigateBack()
    },
    checkLocal() {
      console.log(localStorage.getItem('questionnaires'))
      if (!localStorage.getItem('questionnaires')) {
        setTimeout(() => {
          this.$showModal(modal, { cancelable: false }).then(res => {})
        }, 500)
        return false
      } else return true
    }
  }
}
</script>

<style scoped>
Page {
  /* clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); */
  background-color: rgba(0, 0, 0, 0);
}
.image {
  background-color: rgba(0, 0, 0, 0);
  
}
.coverImage1 {
  background-image: url('https://picsum.photos/400/200');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.card {
  border-width: 0;
  border-radius: 50%;
  clip-path: circle(100% at 50% 50%);
  background-color: rgba(255, 255, 255, 0);
}
</style>
