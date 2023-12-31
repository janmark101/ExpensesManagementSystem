import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';


interface User {
  token : string;
  user_id : number;
  firstname: string;
  lastname : string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private Auth : AuthService,private router: Router){};

  user : User = { token: '', user_id: 0 ,firstname: '',lastname:''};
  error = "";

  onSubmit(form: NgForm){

    let data = {
      "username" : form.value.username,
      "password" : form.value.password
    };

    
    this.Auth.login(data).subscribe((data:any) => {
      this.user.token = data.token;
      this.user.user_id = data.user_id;
      this.user.firstname = data.firstname;
      this.user.lastname = data.lastname;
            
      localStorage.setItem('user',JSON.stringify(this.user));


      this.router.navigate(['/home']);
      
    },(error:any) =>{
      this.error = 'Invalid credentials!';
      form.reset();
    });

  }

}
