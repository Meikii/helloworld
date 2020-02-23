<template>
  <!-- <ActionBar title="Home"/> -->
  <StackLayout
    class="MainMenu"
    minWidth="200"
  >
    <TextField
      hint="نام کاربری"
      text
      v-model="user"
      fontSize="20"
    />
    <StackLayout height="60" />
    <TextField
      hint="گذرواژه"
      text
      v-model="pass"
      fontSize="20"
    />
    <StackLayout height="60" />

    <!-- <Label
      text
      textWrap="true"
    >
      <FormattedString>
        <Span text="Login" />

        <Span
          text=" همگام سازی "
          style="color: red"
        />
        <Span text="کنید. " />
        
      </FormattedString>
    </Label> -->
    <Label
      :text="isBusy ? 'لطفا صبر کنید...' : 'ورود به ادمین'"
      textWrap="true"
      textAlignment="center"
      @tap="gotoAdmin"
      borderRadius="10%"
      color="white"
      fontSize="20"
      width="auto"
      padding="0 10"
      :backgroundColor="isBusy ? 'gray' : 'red'"
      :isEnabled="!isBusy"
    >

    </Label>
    <StackLayout height="30" />
    <Label
      v-if="isWrong"
      text="نام کاربری و گذرواژه اشتباه است."
      textWrap="true"
      textAlignment="center"
      borderRadius="10%"
      color="red"
      fontSize="30"
    >

    </Label>
  </StackLayout>
</template>

<script>
import routes from '~/routes/'
import {
  getConnectionType,
  connectionType
} from 'tns-core-modules/connectivity'
import axios from 'axios'

export default {
  data() {
    return {
      user: '',
      pass: '',
      isBusy: false,
      isWrong: false
    }
  },
  methods: {
    gotoAdmin() {
      this.isWrong = false
      this.isBusy = true

      let userPass = localStorage.getItem('user/pass')
      console.log(userPass)
      if (userPass) {
        if (
          userPass.user == this.user.toLowerCase() &&
          userPass.pass == this.pass.toLowerCase()
        ) {
          console.log(this.user + ' ' + this.pass)
          this.$modal.close()

          setTimeout(() => {
            this.$navigateTo(routes.admin)
          }, 100)
        } else {
          this.isWrong = true
        }
        this.isBusy = false
      } else {
        if (getConnectionType() == connectionType.none) {
          alert('اتصال به اینترنت لازم است.')
        } else {
          console.log(
            'http://' +
              this.user +
              ':' +
              this.pass +
              '@satrapp.manamedapp.com/issues.json?limit=1'
          )
          const text = new java.lang.String(
            this.user.toLowerCase() + ':' + this.pass.toLowerCase()
          )
          const data = text.getBytes('UTF-8')
          const base64 = android.util.Base64.encodeToString(
            data,
            android.util.Base64.DEFAULT
          )
          // console.log('HEREEEEEEEEEEEEE')
          // console.log(base64)
          // return
          axios
            .get(
              'http://satrapp.manamedapp.com/issues.json?limit=1',
              // 'http://' +
              //   this.user +
              //   ':' +
              //   this.pass +
              //   '@satrapp.manamedapp.com/issues.json?limit=1',
              {
                headers: {
                  'X-Requested-With': 'XMLHttpRequest',
                  'Content-Type': 'application/x-www-form-urlencoded',
                  Accept: '*',
                  'Access-Control-Allow-Credentials': 'true',
                  Authorization: 'Basic ' + base64 //'bmFqbWllaF9hZG1pbjoxMjM0NTY3OA=='
                }
              }
            )
            .then(response => {
              console.log(response.data)

              this.isBusy = false
              if (response.data.issues.length) {
                localStorage.setItemObject('user/pass', {
                  user: this.user.toLowerCase(),
                  pass: this.pass.toLowerCase()
                })
                this.$modal.close()

                setTimeout(() => {
                  this.$navigateTo(routes.admin)
                }, 100)
              } else {
                this.isWrong = true
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      }
    },
    checkUserPass() {}
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
