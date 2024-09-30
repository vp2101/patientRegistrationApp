import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    private userKey = 'patient';
  
    register(user: any) {
      const isLocalData = localStorage.getItem(this.userKey);
      const localArray = isLocalData ? JSON.parse(isLocalData) : [];
      localArray.push(user);
      localStorage.setItem(this.userKey, JSON.stringify(localArray));
    }
  
    login(userName: string, password: string): boolean {
      const isLocalData = localStorage.getItem(this.userKey);
      if (isLocalData) {
        const users = JSON.parse(isLocalData);
        return users.some((m: any) => m.userName === userName && m.password === password);
      }
      return false;
    }
  
    userExists(): boolean {
      return localStorage.getItem(this.userKey) !== null;
    }
  }
  