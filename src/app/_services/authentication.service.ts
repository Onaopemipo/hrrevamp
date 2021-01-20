import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { User, UserClass } from "../_models/user";
import { Router } from '@angular/router';
import { Observable, of, BehaviorSubject } from 'rxjs';

export enum CUSTOMER_TYPES{
    CUSTOMER = 0,
    PARTNER = 1,
    RIDER = 2
}

@Injectable()
export class AuthenticationService {
    main_id = 0;
    user: User={}
    users = [];
  public  globalUser = new BehaviorSubject<any>('');
  public  globalUserRole = new BehaviorSubject<any>('');
  public  globalUserType = new BehaviorSubject<any>('');
  public  globalUserName = new BehaviorSubject<any>('');
  public  globalDispatchName = new BehaviorSubject<any>('');
  public  globalPartnerName = new BehaviorSubject<any>('');
  public  globalCustomerProfileurl = new BehaviorSubject<any>('');
  public  globalDispatchProfileurl = new BehaviorSubject<any>('');
  public  globalUserEmail = new BehaviorSubject<any>('');
  public  globalUserId = new BehaviorSubject<any>('');
  public  globalAdminStatus = new BehaviorSubject<any>('');
  public  globalDispathcerId = new BehaviorSubject<any>('');


 constructor(private router: Router){}

    getuser(){
        this.users = [];    
        return new Promise((resolve) => {
            var users = JSON.parse(localStorage.getItem('user'));            
                if(users){
                  this.users;
                    for(let user of users){
      
                        let saveduser = {
                            customToken: user.customToken,
                            token: user.token,
                            phone: user.phone,
                            userId: user.userId,
                            userType: user.userType,
                            isProfileComplete: user.isProfileComplete,
                            user: user.user,
                            customer: user.customer,
                            dispatcher: user.dispatcher,
                            role: user.role,
                            totalAsignedOrder : user.totalAsignedOrder,
                            totalCarryOver : user.totalCarryOver,
                            totalCheckOutAssistanntlOrder : user.totalCheckOutAssistanntlOrder,
                            totalCustomer : user.totalCustomer,
                            totalDelivered : user.totalDelivered,
                            totalDispatched : user.totalDispatched,
                            totalDispatcher : user.totalDispatcher,
                            totalIntlOrder: user.totalIntlOrder,
                            totalLocalOrder:user.totalLocalOrder,
                            totalParneter: user.totalParneter

                        };
                        this.users.push(saveduser);  
                        this.globalUserRole = this.users[0].role[0].name;    
                        this.globalUserType =this.users[0].user.userType;
                        this.globalUserEmail = this.users[0].user.email;
                        this.globalAdminStatus = this.users[0].user.isAdmin;
                        if(this.users[0].customer){
                            this.globalPartnerName = this.users[0].customer.businessName;
                            this.globalUserName = this.users[0].customer.fullName;
                            this.globalCustomerProfileurl = this.users[0].customer.companyLogo;
                        }
                        if(this.users[0].dispatcher){
                            this.globalDispatchName = this.users[0].dispatcher.name;
                            this.globalDispatchProfileurl = this.users[0].dispatcher.profilePicUrl;
                            this.globalDispathcerId = this.users[0].dispatcher.id;
                        }
                        this.globalUserId = this.users[0].userId;
                        this.globalUser.next(this.users[0])
                    }
                   
                }
                resolve(this.users);
      
        });   
    
         
        }

        save(): any {
        localStorage.setItem('user', JSON.stringify(this.users));              
         }

        addUser(user){      
           
               let userObj = {
                customToken: user.customToken,
                token: user.token ,
                phone: user.phone,
                userId: user.userId,
                userType: user.userType,
                isProfileComplete: user.isProfileComplete,
                user: user.user,
                customer: user.customer,
                dispatcher: user.dispatcher,
                role: user.role,
               }   
                this.users = [];
                this.users.push(userObj);
                this.globalUserRole = this.users[0].role[0].name;    
                this.globalUserType = this.users[0].user.userType;
                this.globalUserId = this.users[0].userId;
                this.globalUser.next(this.users[0])
                this.globalAdminStatus = this.users[0].user.isAdmin;
                if(this.users[0].customer){
                    this.globalPartnerName = this.users[0].customer.businessName;
                    this.globalUserName = this.users[0].customer.fullName;
                    this.globalCustomerProfileurl = this.users[0].customer.companyLogo;
                }
                if(this.users[0].dispatcher){
                    this.globalDispatchName = this.users[0].dispatcher.name;
                    this.globalDispatchProfileurl = this.users[0].dispatcher.profilePicUrl;
                    this.globalDispathcerId = this.users[0].dispatcher.id;
            }
            localStorage.setItem('user', JSON.stringify(this.users));  
       
              }

        updateuser(user){        
        this.users = [];
        this.users.push(user);
        localStorage.setItem('user', JSON.stringify(this.users));   
      
        }

        removeUser(user): void {

            let index = this.users.indexOf(user);
      
            if(index > -1){
                this.users.splice(index, 1);
                this.save();
            }
      
        }

        clearusers(){
            this.users = [];
            localStorage.removeItem('user');  
           // this.storage.set('user', this.users);    
        }

}