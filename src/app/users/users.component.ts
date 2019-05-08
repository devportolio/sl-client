import { Component, OnInit } from "@angular/core";
import { UsersService } from "./users.service";
import { ToastrService } from "ngx-toastr";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "firstname",
    "lastname",
    "fullName",
    "email",
    "action"
  ];
  dataSource: any[];
  loading: boolean = true;
  errors: any;

  constructor(
    private readonly usersService: UsersService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.usersService.getUsersList().subscribe(({ loading, data }) => {
      if (!loading) {
        this.dataSource = data.allUsers;
      }
    });
  }

  delete(userId: string) {
    try {
      this.usersService.deleteUser(userId).subscribe(({ loading, data }) => {
        if (!loading && data.deleteUser) {
          this.toastr.success("Delete successful");
        } else {
          this.toastr.error("Unable to delete.");
        }
      });
    } catch (err) {
      console.log("hjere");
    }
  }
}
