import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/LoginCom.vue";
import Register from "../components/RegisterCom.vue";

import HomeCom from "../components/HomeCom.vue";
import AccountInfoCom from "../components/AccountInfoCom.vue";
import ClassCom from "../components/ClassCom.vue";
import MemberCom from "../components/MemberCom.vue";
import StudentCom from "../components/StudentCom.vue";
import ScoreCom from "../components/ScoreCom.vue";
import SubjectCom from "../components/SubjectCom.vue";
import SummaryCom from "../components/SummaryCom.vue";
import TeacherCom from "../components/TeacherCom.vue";
import WelcomeCom from "../components/WelcomeCom.vue";
import FacultyCom from "../components/FacultyCom.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/register",
      name: "Register",
      component: Register,
    },
    {
      path: "/",
      name: "Login",
      component: Login,
    },
    {
      path: "/home",
      name: "home",
      component: HomeCom,
      children: [
        {
          path: "/",
          name: "WelcomeCom",
          component: WelcomeCom,
        },
        {
          path: "/home/:slug(.*)*",
          name: "WelcomeCom",
          component: WelcomeCom,
        },
        {
          path: "/home/accountInfo",
          name: "accountInfo",
          component: AccountInfoCom,
        },
        {
          path: "/home/faculty",
          name: "faculty",
          component: FacultyCom,
        },
        {
          path: "/home/class",
          name: "class",
          component: ClassCom,
        },
        {
          path: "/home/member",
          name: "member",
          component: MemberCom,
        },
        {
          path: "/home/student",
          name: "student",
          component: StudentCom,
        },
        {
          path: "/home/subject",
          name: "subject",
          component: SubjectCom,
        },
        {
          path: "/home/teacher",
          name: "teacher",
          component: TeacherCom,
        },
        {
          path: "/home/score",
          name: "score",
          component: ScoreCom,
        },
        {
          path: "/home/summary",
          name: "summary",
          component: SummaryCom,
        },
      ],
    },
  ],
});

export default router;
