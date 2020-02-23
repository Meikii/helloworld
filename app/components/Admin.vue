<template>
  <Page
    backgroundSpanUnderStatusBar="true"
    androidStatusBarBackground="#2b586f"
  >
    <ActionBar>
      <!-- <StackLayout horizontalAlignment="left">

        <Label textWrap="true" text="مدیریت" textAlignment="left" fontSize="20" />
      </StackLayout>-->
      <!-- <NavigationButton text="Back" android.systemIcon="ic_menu_back" color="black" @tap="goBack" /> -->

      <GridLayout
        rows="*"
        columns="*,*"
      >

        <Button
          col="1"
          text="همگام سازی"
          @tap="sync"
          textAlignment="center"
          backgroundColor="#ff4700"
          borderRadius="10%"
          color="white"
          width="auto"
          fontSize="20"
        >
          <FormattedString>
            <Span
              :text="String.fromCharCode(0xf021)"
              class="fas"
            />
            <Span text=" همگام سازی" />
          </FormattedString>
        </Button>
        <Button
          col="0"
          text="خروجی داده"
          @tap="getExport"
          textAlignment="center"
          backgroundColor="#088800"
          borderRadius="10%"
          color="white"
          width="auto"
          fontSize="20"
        >
          <FormattedString>
            <Span
              :text="String.fromCharCode(0xf56e)"
              class="fas"
            />
            <Span text=" خروجی داده" />
          </FormattedString>
        </Button>
      </GridLayout>
    </ActionBar>
    <StackLayout>
      <TabView :selectedIndex="0">
        <TabViewItem title="فرم ها">

          <StackLayout>
            <StackLayout>

              <!-- <StackLayout>
              <Label
                col="1"
                text="نام"
                textWrap="true"
              />
              <Label
                col="0"
                text="نوع"
                textWrap="true"
              />
            </StackLayout> -->

            </StackLayout>
            <StackLayout>
              <RadListView
                ref="listView"
                v-if="forms"
                for="(form,index) of forms"
                @itemTap="onItemTap"
                backgroundColor="rgba(255,255,255,.7)"
              >
                <!--  -->
                <!-- <ListView
                v-if="forms"
                for="(form,index) of forms"
                @itemTap="onItemTap"
              > -->

                <v-template name="header">
                  <GridLayout
                    rows="*"
                    columns="*,*"
                    backgroundColor="yellow"
                  >
                    <Label
                      col="1"
                      text="نام"
                      textWrap="true"
                      textAlignment="center"
                    />
                    <Label
                      col="0"
                      text="زمان"
                      textWrap="true"
                      textAlignment="center"
                    />
                  </GridLayout>
                </v-template>
                <v-template>
                  <!-- <StackLayout>

                    <Label
                      col="1"
                      :text="form.name"
                    />

                  </StackLayout> -->

                  <GridLayout
                    rows="*"
                    columns="*,*"
                  >
                    <Label
                      col="1"
                      :text="form.name"
                      textWrap="true"
                    />
                    <Label
                      col="0"
                      :text="jCreated(form.time)"
                      textWrap="true"
                      fontSize="15"
                    />
                  </GridLayout>

                </v-template>
              </RadListView>
              <!-- </ListView> -->
              <Label
                v-else
                text="فرمی وجود ندارد"
                textWrap="true"
              />
            </StackLayout>
          </StackLayout>
        </TabViewItem>
        <TabViewItem title="آمار">

          <StackLayout backgroundColor="rgba(255,255,255,.7)">
            <StackLayout v-if="groupedSections">

              <Label
                v-for="(c,index) of groupedSections"
                :key="index"
                :text="c[0].name+ ' ' +c.length"
              />
            </StackLayout>
            <Label
              v-else
              text="آماری وجود ندارد"
              textWrap="true"
            />
          </StackLayout>
        </TabViewItem>
      </TabView>

    </StackLayout>

  </Page>
</template>

<script>
import axios from 'axios'
import routes from '~/routes/'
import * as fileSystem from 'tns-core-modules/file-system'
import * as permissions from 'nativescript-permissions'
import moment from 'moment-jalaali'
import _ from 'lodash'

export default {
  props: ['from'],
  data() {
    return {
      test: localStorage.getItem('test'),
      forms: localStorage.getItem('forms')
        ? localStorage.getItem('forms').forms
        : '',
      questionnaires: localStorage.getItem('questionnaires')
        ? localStorage.getItem('questionnaires').questionnaires
        : [],
      isBusy: false
    }
  },
  created() {
    console.log('test')
    //  console.dir(this.forms)
    console.dir(_.groupBy(this.forms, 'name'))
    // console.dir(_.chain(this.forms).groupBy('name'))
    // console.dir(this.forms)
  },
  mounted() {
    // console.log('test')
    // console.log(localStorage)
    // console.dir(localStorage)
    // console.log(localStorage.getItem('test'))
    // console.dir(localStorage.getItem('forms'))
  },
  computed: {
    groupedSections() {
      return _.groupBy(this.forms, 'name')
    }
  },
  methods: {
    jCreated(time) {
      return moment(new Date(time)).format('jYYYY/jM/jD HH:mm:ss')
    },
    getExport() {
      console.dir('this.forms')
      console.dir(this.forms)
      permissions
        .requestPermission(
          android.Manifest.permission.WRITE_EXTERNAL_STORAGE,
          "I need these permissions because I'm cool"
        )
        .then(() => {
          console.log('Woo Hoo, I have the power!')

          const documentsFolder = android.os.Environment.getExternalStoragePublicDirectory(
            android.os.Environment.DIRECTORY_DOCUMENTS
          ).toString()

          const folder = fileSystem.Folder.fromPath(documentsFolder)

          folder
            .getEntities()
            .then(entities => {
              // entities is an array of files and folders.
              entities.forEach(entity => {
                console.log(entity.name)
              })
            })
            .catch(err => {
              // Failed to obtain folder's contents.
              console.log(err)
            })
          let file = folder.getFile(new Date().toISOString() + '.json')
          file
            .writeText(JSON.stringify(this.forms))
            .then(res => {
              alert({
                title: '',
                message:
                  'فایل "' +
                  file.name +
                  '" با موفقیت در پوشه Documents ذخیره شد.',
                okButtonText: 'باشه'
              })
              console.log(res)
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(() => {
          console.log('Uh oh, no permissions - plan B time!')
        })
      // let saved = imageSource.saveToFile(path2, 'png')
    },
    onItemTap(item) {
      console.dir(item.item)

      let questionnaire = item.item
      this.$navigateTo(routes.surveyPage, {
        /////////
        backstackVisible: false,
        props: {
          from: 'admin',
          questionnaire: questionnaire
        }
      })
    },
    gotoReception() {
      console.log('OK')
      this.$navigateTo()
    },
    goBack() {
      this.$navigateBack()
    },
    sync() {
      this.getAllQuestionnaires()

      this.uploadForms()
    },

    uploadForms() {
      console.log('localStorage.getItem')
      console.log(localStorage.getItem('forms'))
      if (localStorage.getItem('forms')) {
        let forms = localStorage.getItem('forms')
        axios
          .post(
            'http://satrapp.manamedapp.com:3000/uploadForms',

            {
              forms
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Accept: '*',
                'Access-Control-Allow-Credentials': 'true'
              }
            }
          )
          .then(response => {
            console.log(response)

            localStorage.removeItem('forms')
          })
      }
    },
    getAllQuestionnaires() {
      this.isBusy = true

      axios
        .post('http://satrapp.manamedapp.com:3000/getQuestionnaires', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: '*',
            'Access-Control-Allow-Credentials': 'true'
          }
        })
        .then(response => {
          this.isBusy = false
          console.log('response')
          console.log(response.data.questionnaires.filter(x=>x.isDemographic == 1))

          localStorage.setItemObject('questionnaires', response.data)
          alert({
            title: '',
            message: 'اطلاعات همگام سازی شد.',
            okButtonText: 'باشه'
          }).then(res => {
            this.forms = []
          })
        })
    }
  }
}
</script>

<style scoped>
Page {
  background-image: url('~/images/Admin.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  /* vertical-align: center; */
  /* font-size: 20; */
  /* margin: 15; */
}
ActionBar {
  font-family: 'IRANSans(FaNum)';
  direction: rtl;
}
.reception {
  background-image: url('~/images/reception.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto;
  border-radius: 100;
  color: white;
  font-size: 30;
  border: rgb(163, 158, 158);
  border-width: 0;

  transform: translate(10, 27);

  width: 100%;
  height: 100%;
  opacity: 0;
}
.reception_text {
  /* background-image: url("~/images/patient survey.png"); */
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto;
  border-radius: 100;
  color: white;
  font-size: 20;
  border: rgb(163, 158, 158);
  border-width: 0;

  transform: translate(25, 5);

  width: 100%;
  height: 100%;
  opacity: 0;
}
</style>
