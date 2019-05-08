import { UsersService } from "./../users/users.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private readonly usersService: UsersService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.form = new FormGroup(
      {
        firstname: new FormControl("", Validators.required),
        lastname: new FormControl("", Validators.required),
        email: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("", Validators.required),
        verifyPassword: new FormControl("")
      },
      { validators: this.checkPasswords }
    );
  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.verifyPassword.value;

    const mismatch = pass === confirmPass ? null : { mismatch: true };

    group.controls.verifyPassword.setErrors(mismatch);
    return null;
  }

  private clearForm() {
    for (let index in this.form.controls) {
      this.form.controls[index].setErrors(null);
    }
    this.form.reset();
  }

  submitRegistration(e: Event) {
    e.preventDefault();
    console.log(this.form);
    if (!this.form.invalid) {
      const { verifyPassword, ...input } = this.form.value;
      this.usersService.registerUser(input).subscribe(({ loading, errors }) => {
        if (!loading && !errors) {
          this.clearForm();
          this.toastr.success("Registration Successful");
        }
      });
    }
  }
}
