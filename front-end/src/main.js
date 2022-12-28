import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { vfmPlugin } from "vue-final-modal";
import {
  faHouse,
  faUser,
  faUsers,
  faChalkboardTeacher,
  faBook,
  faMedal,
  faUsersGear,
  faBookmark,
  faCircleQuestion,
  faCirclePlus,
  faCircleMinus,
  faBookOpen,
  faPenToSquare,
  faArrowDownAZ,
  faArrowDownZA,
  faArrowsUpDown,
} from "@fortawesome/free-solid-svg-icons";
const app = createApp(App);

app.use(router);

library.add(
  faHouse,
  faUser,
  faUsers,
  faChalkboardTeacher,
  faBook,
  faMedal,
  faUsersGear,
  faBookmark,
  faCircleQuestion,
  faCirclePlus,
  faCircleMinus,
  faBookOpen,
  faPenToSquare,
  faArrowDownAZ,
  faArrowDownZA,
  faArrowsUpDown
);
app.mount("#app");
app.use(vfmPlugin);
app.component("font-awesome-icon", FontAwesomeIcon);
