import { Routes } from '@angular/router';
import { UserComponent } from './features/user/user.component';
import { HomeComponent } from './features/home/home.component';
import { ChatComponent } from './features/chat/chat.component';
import { CategoryComponent } from './features/category/category.component';
import { ProductComponent } from './features/product/product.component';
import { LoginComponent } from './features/user/login/login.component';
import { RegisterComponent } from './features/user/register/register.component';
import { ProfileDetailComponent } from './features/user/profile-detail/profile-detail.component';
import { ProductDetailComponent } from './features/product/product-detail/product-detail.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';

export const routes: Routes = [
    {path: '', title: 'home page', component: HomeComponent },
    {path: 'profile/:title', title:'profile', component:ProfileDetailComponent },
    {path: 'user', title:'user page', component:UserComponent, 
        children:[
            {path:'login', title:'login_user', component:LoginComponent},
            {path: 'register', title:'register_user', component:RegisterComponent},
       
    ]}
    ,

    {path: 'home', title:'home page', component:HomeComponent},
    {path: 'chat', title: 'chat page', component:ChatComponent},
    {path: 'category', title: 'category page', component: CategoryComponent},
    {path: 'ads/product', title: 'product page', component: ProductComponent },
    {path: 'ads/detail-view', title: 'detail-view', component:ProductDetailComponent},
    { path: '**', title: 'Not Found', component: NotFoundComponent }
];
