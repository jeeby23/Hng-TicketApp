import { createRouter, createWebHistory } from "vue-router";
import { authRoutes,authGuard} from "./auth.js";
import { defRoutes} from "./defRoutes.js";
import { dashboardroutes }  from "./Dashboard.js";


const routes = [...authRoutes,...defRoutes,...dashboardroutes]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
   routes,
});
router.beforeEach(authGuard)
export default router;
