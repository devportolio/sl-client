import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { UsersEditDTO } from "./../users.dto";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UsersService } from "../users.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-users-edit",
  templateUrl: "./users-edit.component.html",
  styleUrls: ["./users-edit.component.scss"]
})
export class UsersEditComponent implements OnInit {
  form: FormGroup;
  userId: string;
  userItem: UsersEditDTO;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly usersService: UsersService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.params["id"];
    this.getUserData();
    this.form = new FormGroup({
      firstname: new FormControl("", Validators.required),
      lastname: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email])
    });
  }

  getUserData() {
    this.usersService.getUser(this.userId).subscribe(({ data }) => {
      this.userItem = data.getUser;
      this.setUserDetails();
    });
  }

  async setUserDetails() {
    for (let index in this.form.controls) {
      this.form.controls[index].setValue(this.userItem[index]);
    }
  }

  submitEdit(e: Event) {
    e.preventDefault();
    if (!this.form.invalid) {
      this.usersService
        .updateUser(this.userId, this.form.value)
        .subscribe(({ loading, errors }) => {
          if (!loading && !errors) {
            this.toastr.success("Edit Successful");
          }
        });
    }
  }
}
