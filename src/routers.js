
import HelloWorld from "@/components/HelloWorld";
import Login from "@/components/Login";
import Product from "@/components/Product";
import MarketBase from "@/components/MarketBase";
import MarketBaseList from "@/components/MarketBaseList";
import PaymentList from "@/components/PaymentList";
import Registration from "@/components/Registration";


export default[
    {path: '/', component: HelloWorld},
    {path: '/login', component: Login},
    {path: '/product', component: Product},
    {path: '/market-base', component: MarketBase},
    {path: '/market-base/list', component: MarketBaseList},
    {path: '/payment-list', component: PaymentList},
    {path: '/register', component: Registration},


]