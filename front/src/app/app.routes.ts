import { Routes } from '@angular/router';
import { UserComponent } from './features/user/user.component';
import { HomeComponent } from './features/home/home.component';
import { ChatComponent } from './features/chat/chat.component';
import { CategoryComponent } from './features/category/category.component';
import { ProductComponent } from './features/product/product.component';
import { LoginComponent } from './features/user/login/login.component';

export const routes: Routes = [
    {path: '', title: 'home page', component: HomeComponent },
    {path: 'user', title:'user page', component:UserComponent, 
    children:[
        {path:'login', title:'user login', component:LoginComponent}
    ]}
    ,

    {path: 'home', title:'home page', component:HomeComponent},
    {path: 'chat', title: 'chat page', component:ChatComponent},
    {path: 'category', title: 'category page', component: CategoryComponent},
    {path: 'product', title: 'product page', component: ProductComponent }
];
